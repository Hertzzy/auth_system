const { Router } = require('express');
const UserController = require('../controller/userController');
const { verifyRole } = require('../middleware/verifyRole');
const authentication = require('../middleware/authentication');

const router = Router();

// Registrar usuário (admin e user podem acessar)
router.post('/users', UserController.registerUser);
// Buscar todos os usuários (admin e user podem acessar)
router.get('/users', authentication, verifyRole([1, 2]), UserController.searchAllUsers);
// Buscar usuário por ID (admin e user podem acessar)
router.get('/users/id/:id', authentication, verifyRole([1, 2]), UserController.searchUserId);
// Editar usuário por ID (somente admin pode acessar)
router.put('/users/id/:id', authentication, verifyRole([1]), UserController.editUser);
// Deletar usuário por ID (somente admin pode acessar)
router.delete('/users/id/:id', authentication, verifyRole([1]), UserController.deleteUser);
module.exports = router;
