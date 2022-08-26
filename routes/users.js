const express = require('express');

const userRoutes = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

userRoutes.get('/users', express.json(), getUsers);

userRoutes.post('/users', express.json(), createUser);

userRoutes.get('/users/:userId', getUserById);

userRoutes.patch('/users/me', express.json(), updateUser);

userRoutes.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = userRoutes;
