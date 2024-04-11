const db = require('../models')
const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

class AuthService {
    async login(dto) {
        const user = await db.users.findOne({
            where: {
                email: dto.email
            },
            include: [{
                model: db.roles,
                attributes: ['role_name', 'description'],
                through: {
                  attributes: []
                }
            }],
            attributes: ['id', 'name', 'email', 'password_hash', 'status'],
        })
        
        if (!user) {
            throw new Error('Usuario não cadastrado')
        }

        const samePassword = await compare(dto.password_hash, user.password_hash)

        if (!samePassword) {
            throw new Error('Usuario ou senha invalido')
        }

        if(!user.email){
            throw new Error('Usuario ou senha invalido')
        }

        const accessToken = sign({
            id: user.id,
            email: user.email
        }, jsonSecret.secret, {
            expiresIn: 86400
        }) 

        return {
            accessToken,
            user,
            message: 'Login realizado com sucesso!'
        }
    }
}

module.exports = AuthService