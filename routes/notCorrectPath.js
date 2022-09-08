const express = require('express');
const { errorReqNotFound } = require('../errors/errorReqNotFound');

const notCorrectPath = express.Router();

notCorrectPath.all('*', (req, res) => {
  res.status(errorReqNotFound).send({ message: 'Запрашиваемого ресурса не существует' });
});

module.exports = notCorrectPath;
