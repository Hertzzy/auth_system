const db = require('../models');
const { hash } = require('bcryptjs');
// const uuid = require('uuid')

class UserService {
  // Register new User
  async registerUser(dto) {
    const user = await db.users.findOne({
      where: {
        email: dto.email
      }
    });

    if (user) {
      throw new Error('Esse usuário já foi cadastrado');
    }

    const t = await db.sequelize.transaction();

    try {
      const passwordHash = await hash(dto.password_hash, 6);

      // Define o status padrão como '1' caso não tenha sido passado no dto
      // const status = dto.status || '1';

      const newUser = await db.users.create(
        {
          name: dto.name,
          email: dto.email,
          password_hash: passwordHash,
          status: dto.status || '1'
        },
        { transaction: t }
      );

      // Verifique se role_name foi fornecido; se não, defina como 'user'
      const roleName = dto.role_name || 'user';

      // Verifique se a role já existe
      const existingRole = await db.roles.findOne({
        where: { role_name: roleName }
      });

      if (!existingRole) {
        await t.rollback(); // Reverte a transação em caso de erro
        throw new Error('Perfil não encontrado!');
      }

      // Associação do usuário ao role usando Users_Roles
      await db.users_roles.create(
        {
          user_id: newUser.id,
          role_id: existingRole.id
        },
        { transaction: t }
      );

      // Confirma a transação, se todas as operações acima forem bem-sucedidas
      await t.commit();
      return { newUser, roleName };
    } catch (error) {
      await t.rollback(); // Reverte a transação em caso de erro
      throw new Error(error.message || 'Erro ao cadastrar usuário');
    }
  }
  // Search all Users
  async searchAllUsers() {
    try {
      const users = await db.users.findAll({
        include: [
          {
            model: db.roles,
            attributes: ['id', 'role_name', 'description'],
            through: {
              attributes: []
            }
          }
        ],
        attributes: { exclude: ['password_hash'] } // Excluir password_hash dos dados retornados
      });

      return users;
    } catch (error) {
      throw new Error('Não foi possível visualizar os usuários.');
    }
  }
  // Search one Users ID
  async searchUsersId(id) {
    const user = await db.users.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: db.roles,
          attributes: ['id', 'role_name', 'description'],
          through: {
            attributes: []
          }
        }
      ],
      attributes: { exclude: ['password_hash'] }
    });

    if (!user) {
      throw new Error('Esse usuário não existe');
    }

    return user;
  }
  // Delete User ID
  async deleteUserId(id) {
    await this.searchUsersId(id);

    try {
      await db.users.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error('Erro ao tentar deletar o usuario! Tente novamente mais tarde');
    }
  }
}

module.exports = UserService;
