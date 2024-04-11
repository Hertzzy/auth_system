const { Op } = require('sequelize');
const db = require('../models')

const roles = {
  admin: ['admin'],
  manager: ['admin', 'manager'],
  user: ['admin', 'manager', 'user'],
};

const verifyRole = (allowedRoles) => async (req, res, next) => {
  const { user } = req.body; // Obter o usuário da requisição
  console.log(user)

  // Buscar a role do usuário no banco de dados
  const userRole = await db.users_roles.findOne({
    where: {
      user_id: user.id,
      role_id: {
        [Op.in]: roles[allowedRoles],
      },
    },
  });

  if (!userRole) {
    return res.status(403).json({
      message: 'Você não tem permissão para acessar este recurso.',
    });
  }

  next(); // Permitir que a requisição continue
};

module.exports = {verifyRole};