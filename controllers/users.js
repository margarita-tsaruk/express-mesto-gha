const User = require('../models/user');
const {
  errorBadReq,
  errorReqNotFound,
  errorServer,

} = require('../errorCodes');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
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
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
};
