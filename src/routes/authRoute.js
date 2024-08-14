const { Router } = require('express');
const AuthController = require('../controller/authController');
const { verifyToken } = require('../middleware/verifyToken');

const router = Router();

router
  .post('/auth/login', AuthController.login)
  .get('/auth/verify', verifyToken, (req, res) => {
    res.status(200).send({ message: 'Token is valid.' });
  });

module.exports = router;