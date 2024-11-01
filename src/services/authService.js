const db = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

class AuthService {
  async login(dto) {
    const user = await db.users.findOne({
      where: {
        email: dto.email
      },
      include: [
        {
          model: db.roles,
          attributes: ['role_name', 'description'],
          through: {
            attributes: []
          }
        }
      ],
      attributes: ['id', 'name', 'email', 'password_hash', 'status']
    });

    if (!user) {
      throw new Error('Usuário não cadastrado');
    }

    const samePassword = await compare(dto.password_hash, user.password_hash);

    if (!samePassword) {
      throw new Error('Usuário ou senha inválido');
    }

    const accessToken = sign(
      {
        id: user.id,
        email: user.email
      },
      jsonSecret.secret,
      {
        expiresIn: 86400 // Tempo de expiração do token
      }
    );

    // Remove o `password_hash` dos dados do usuário antes de retornar
    const { password_hash: _, ...userWithoutPassword } = user.dataValues;

    return {
      accessToken,
      user: userWithoutPassword,
      message: 'Login realizado com sucesso!'
    };
  }
}

module.exports = AuthService;
