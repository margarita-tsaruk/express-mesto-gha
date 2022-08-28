const Card = require('../models/card');
const {
  errorBadReq,
  errorReqNotFound,
  errorServer,

} = require('../errorCodes');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(errorServer).send({ message: `Произошла ошибка: ${err}` }));
};

const createCards = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errorBadReq).send({ message: 'Переданы некорректные данные при создании карточки' });
        return;
      }
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(errorReqNotFound).send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errorBadReq).send({ message: 'Передан некорректный id' });
        return;
      }
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
};

const likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(errorReqNotFound).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errorBadReq).send({ message: 'Передан некорректный id' });
        return;
      }
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        res.status(errorReqNotFound).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(errorBadReq).send({ message: 'Передан некорректный id' });
        return;
      }
      res.status(errorServer).send({ message: `Произошла ошибка: ${err}` });
    });
};

module.exports = {
  getCards,
  createCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
