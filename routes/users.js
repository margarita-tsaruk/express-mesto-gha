const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRoutes = express.Router();

const {
  getUsers,
  getUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/users', express.json(), getUsers);

userRoutes.get('/users/me', express.json(), getUser);

userRoutes.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24)
      .max(24),
  }),
}), getUserById);

userRoutes.patch('/users/me', express.json(), updateUser);

userRoutes.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = userRoutes;
