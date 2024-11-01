const { Op } = require('sequelize');
const db = require('../models');

const roles = {
  admin: [1], // ID do papel de admin
  user: [1, 2] // IDs dos papéis de admin e user
};

const verifyRole = allowedRoles => async (req, res, next) => {
  const userId = req.userId; // Obter o ID do usuário autenticado

  // Adicione uma verificação para garantir que `userId` não seja undefined
  if (!userId) {
    return res.status(400).json({ message: 'ID do usuário não fornecido.' });
  }

  // Buscar a role do usuário no banco de dados
  const userRole = await db.users_roles.findOne({
    where: {
      user_id: userId,
      role_id: {
        [Op.in]: allowedRoles // Usar os roles permitidos passados
      }
    }
  });

  if (!userRole) {
    return res.status(403).json({
      message: 'Você não tem permissão para acessar este recurso.'
    });
  }

  next(); // Permitir que a requisição continue
};

module.exports = { verifyRole };
