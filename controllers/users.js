const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const errorReqNotFound = require('../errors/errorReqNotFound');
const errorBadReq = require('../errors/errorBadReq');
const errorForbiddenReq = require('../errors/errorForbiddenReq');
const errorServer = require('../errors/errorServer');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hashedPassword,
      }).then((user) => res.send(user)).catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(errorBadReq).send({ message: 'Переданы некорректные данные при создании пользователя' });
          return;
        }
        res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign({
              _id: user._id,
            }, 'SECRET');

            res.cookie('jwt', token, {
              expiresIn: '7d',
              httpOnly: true,
              sameSite: true,
            });

            res.send({ data: user.toJSON() });
          } else {
            res.status(errorForbiddenReq).send({ message: 'Неправильные почта или пароль' });
          }
        });
    })
    .catch(next);
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(errorReqNotFound).send({ message: 'Пользователь с указанным _id не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errorBadReq).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorBadReq).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
};

function updateAvatar(req, res) {
  const { avatar } = req.body;
  const id = req.user._id;
  User.findByIdAndUpdate(id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorBadReq).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        return;
      }
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
}

module.exports = {
  createUser,
  login,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
};
