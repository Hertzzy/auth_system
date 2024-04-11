const { Router } = require('express');
const UserController = require('../controller/userController');
// const { verifyRole } = require('../middleware/verifyRole');

const authentication = require('../middleware/authentication')

const router = Router()

router
    .post('/users', UserController.registerUser)
    .get('/users', authentication, UserController.searchAllUsers)
    .get('/users/id/:id', authentication, UserController.searchUserId)
    .put('/users/id/:id', authentication, UserController.editUser)
    .delete('/users/id/:id', authentication, UserController.deleteUser)


module.exports = router;