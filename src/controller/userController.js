const UserService = require('../services/userService');
const userService = new UserService();

const db = require('../models');
const { hash } = require('bcryptjs');

class DocController {
  // Register Doc
  static async registerUser(req, res) {
    const { id, name, email, password_hash, status, role_name } = req.body;

    console.log('Controller: ', id, name, email, password_hash, status, role_name);

    if (!name || !email || !password_hash || !status) {
      return res.status(400).send({ message: 'Por favor, forneça todos os campos necessários.' });
    }

    // Se role_name não for fornecido, defina como 'user'
    const userRole = role_name || 'user';

    try {
      // Registrar o usuário usando o service
      const user = await userService.registerUser({ name, email, password_hash, status, role_name: userRole });

      // Acessa os `dataValues` e remove o `password_hash`
      const { password_hash: _, ...userWithoutPassword } = user.newUser.dataValues;

      res.status(201).send({
        user: {
          newUser: userWithoutPassword,
          roleName: user.roleName
        },
        message: 'Usuário cadastrado!'
      });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  // Search all Users
  static async searchAllUsers(req, res) {
    const users = await userService.searchAllUsers();
    res.status(200).json(users);
  }
  // Search user id
  static async searchUserId(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.searchUsersId(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(400).send({
        message: error.message
      });
    }
  }
  // Edit User
  static async editUser(req, res) {
    try {
      const { id } = req.params;
      const user = req.body;

      // Criptografa a nova senha, se fornecida
      if (user.password_hash) {
        user.password_hash = await hash(user.password_hash, 6);
      }

      // Verifica se `role_name` está presente
      if (!user.role_name) {
        return res.status(400).json({
          mensagem: 'Erro: Função não fornecida!'
        });
      }

      // Verifica se a Role já existe
      const existingRole = await db.roles.findOne({
        where: { role_name: user.role_name }
      });

      if (!existingRole) {
        return res.status(400).json({
          mensagem: 'Erro: Função não encontrada!'
        });
      }

      // Atualiza os dados do usuário
      await db.users.update(user, { where: { id } });

      // Atualiza a associação do usuário com a função
      await db.users_roles.update({ role_id: existingRole.id }, { where: { user_id: id } });

      // Remove `password_hash` do objeto `user` antes de enviar a resposta
      delete user.password_hash;

      return res.json({
        user,
        mensagem: 'Usuário editado com sucesso!'
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        mensagem: 'Erro ao editar usuário'
      });
    }
  }
  // Delete User
  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await userService.deleteUserId(id);

      res.status(200).send({
        message: 'Usuario deletado com sucesso!'
      });
    } catch (error) {
      res.status(400).send({
        message: error.message
      });
    }
  }
}

module.exports = DocController;
