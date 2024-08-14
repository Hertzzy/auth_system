const jwt = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

// Middleware para verificar o token
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).send({ message: 'No token provided.' });
  }

  jwt.verify(token.split(' ')[1], jsonSecret.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = { verifyToken };