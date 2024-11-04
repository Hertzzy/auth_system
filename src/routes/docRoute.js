const { Router } = require('express');
const DocController = require('../controller/docController');
const uploadMiddleware = require('../middleware/upload');
const { verifyRole } = require('../middleware/verifyRole');
const authentication = require('../middleware/authentication');

const router = Router();

// Registrar novo documento (acesso restrito a admin)
router.post('/docs', authentication, verifyRole([1, 2]), uploadMiddleware, DocController.registerDoc);

// Buscar todos os documentos (acesso permitido a admin e user)
router.get('/docs', authentication, verifyRole([1, 2]), DocController.listDocs);

// Buscar documento por ID (acesso permitido a admin e user)
router.get('/docs/id/:id', authentication, verifyRole([1, 2]), DocController.listDocById);

// Editar documento por ID (acesso restrito a admin)
router.put('/docs/id/:id', authentication, verifyRole([1]), uploadMiddleware, DocController.updateDocById);

// Deletar documento por ID (acesso restrito a admin)
router.delete('/docs/id/:id', authentication, verifyRole([1]), DocController.deleteDocById);

module.exports = router;
