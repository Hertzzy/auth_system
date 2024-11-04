const { Router } = require('express');
const DocController = require('../controller/docController');
const uploadMiddleware = require('../middleware/upload'); // Importa o middleware de upload

const router = Router();
// Registrar novo documento (acesso restrito a admin)
router.post('/docs', uploadMiddleware, DocController.registerDoc);

// Buscar todos os documentos (acesso permitido a admin e user)
router.get('/docs', DocController.listDocs);

// Buscar documento por ID (acesso permitido a admin e user)
router.get('/docs/id/:id', DocController.listDocById);

// Editar documento por ID (acesso restrito a admin)
router.put('/docs/id/:id', uploadMiddleware, DocController.updateDocById);

// Deletar documento por ID (acesso restrito a admin)
router.delete('/docs/id/:id', DocController.deleteDocById);

module.exports = router;
