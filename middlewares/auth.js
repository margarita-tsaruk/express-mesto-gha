const jwt = require('jsonwebtoken');
const authError = require('../errors/authError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'SECRET');
  } catch (err) {
    res
      .status(authError)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  next();
};

module.exports = auth;
