const multer = require('multer');

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório onde os arquivos serão armazenados
    cb(null, './public/upload/docUsers'); // Ajuste o caminho conforme necessário
  },
  filename: (req, file, cb) => {
    // Salva o arquivo com um nome que inclui a data atual e o nome original do arquivo
    cb(null, Date.now().toString() + '_' + file.originalname);
  }
});

// Filtro de tipos de arquivos permitidos (apenas PDF)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 MB por arquivo
  fileFilter: (req, file, cb) => {
    // Verifica se o arquivo é do tipo PDF
    if (file.mimetype === 'application/pdf') {
      return cb(null, true); // Aceita o arquivo
    }
    // Rejeita o arquivo se não for PDF
    return cb(new Error('Apenas arquivos PDF são permitidos'), false);
  }
});

// Middleware para upload, onde 'document' é o nome do campo esperado
const uploadMiddleware = upload.single('upload'); // Use 'upload.array' se você quiser permitir múltiplos arquivos, mas para PDF singular, use 'single'

// Exportando o middleware
module.exports = uploadMiddleware;
