const express = require('express');

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

userRoutes.get('/users/:userId', getUserById);

userRoutes.patch('/users/me', express.json(), updateUser);

userRoutes.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = userRoutes;
