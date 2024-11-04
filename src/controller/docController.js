const DocService = require('../services/docService');
const docService = new DocService();
const path = require('path'); // Importa o módulo path

class DocController {
  async registerDoc(req, res) {
    const dto = req.body;
    const files = req.file;

    try {
      if (files) {
        dto.upload = path.basename(files.path); // Armazena apenas o nome do arquivo
      }

      const newDoc = await docService.registerDoc(dto);

      res.status(201).json(newDoc);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async listDocs(req, res) {
    try {
      const docs = await docService.listDocs();
      res.status(200).json(docs);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async listDocById(req, res) {
    const { id } = req.params;

    try {
      const doc = await docService.listDocById(id);
      res.status(200).json(doc);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async updateDocById(req, res) {
    const { id } = req.params;
    const dto = req.body;
    const file = req.file;

    try {
      if (file) {
        dto.upload = path.basename(file.path);
      }

      const updatedDoc = await docService.updateDocById(id, dto);
      res.status(200).json(updatedDoc);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async deleteDocById(req, res) {
    const { id } = req.params;

    try {
      await docService.deleteDocById(id);
      res.status(200).send({ message: 'Documento deletado co sucesso!' });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}

module.exports = new DocController();
