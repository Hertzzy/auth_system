const db = require('../models');

class DocService {
  async registerDoc(dto) {
    const existingDoc = await db.documents.findOne({
      where: {
        code: dto.code
      }
    });

    if (existingDoc) {
      throw new Error('Código do documento já foi cadastrado');
    }

    try {
      const newDoc = await db.documents.create({
        code: dto.code,
        name: dto.name,
        status: dto.status,
        document_type: dto.document_type,
        document_cpf: dto.document_cpf,
        document_rg: dto.document_rg,
        obs: dto.obs,
        upload: dto.upload || null
      });
      return newDoc;
    } catch (error) {
      throw new Error('Erro ao cadastrar o documento: ' + error.message);
    }
  }

  async listDocs() {
    try {
      const docs = await db.documents.findAll();
      return docs;
    } catch (error) {
      throw new Error('Não foi possível listas os documentos: ', +error.message);
    }
  }

  async listDocById(id) {
    const doc = await db.documents.findOne({
      where: {
        id: id
      }
    });

    if (!doc) {
      throw new Error('Esse documento não existe');
    }

    return doc;
  }

  async updateDocById(id, dto) {
    const doc = await this.listDocById(id);

    if (!doc) {
      throw new Error('Documento não encontrado');
    }

    try {
      // Atualiza o documento com os novos dados
      await db.documents.update(dto, {
        where: { id }
      });

      // Recarrega o documento atualizado
      const updatedDoc = await this.listDocById(id);
      return updatedDoc; // Retorna o documento atualizado
    } catch (error) {
      throw new Error('Erro ao atualizar o documento: ' + error.message);
    }
  }
  async deleteDocById(id) {
    const doc = await this.listDocById(id);

    try {
      await db.documents.destroy({
        where: { id }
      });
      return doc;
    } catch (error) {
      throw new Error('Erro ao deletar o documento: ' + error.message);
    }
  }
}

module.exports = DocService;
