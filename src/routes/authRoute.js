const { Router } = require('express');
const AuthController = require('../controller/authController')

const router = Router()

router
    .post('/auth/login', AuthController.login)
    
module.exports = router 