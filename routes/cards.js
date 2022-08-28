const express = require('express');

const cardRoutes = express.Router();

const {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/cards', getCards);

cardRoutes.post('/cards', createCards);

cardRoutes.delete('/cards/:cardId', deleteCard);

cardRoutes.put('/cards/:cardId/likes', likeCard);

cardRoutes.delete('/cards/:cardId/likes', dislikeCard);

module.exports = cardRoutes;
