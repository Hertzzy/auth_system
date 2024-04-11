const db = require('../models');
const { hash } = require('bcryptjs')
// const uuid = require('uuid')
const nodemailer = require('nodemailer');


class UserService {
    constructor() {
        // Configurar o serviço de email
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'helterxb@gmail.com',
                pass: 'Xavier02101728'
            }
        });
    }
    async registerUser(dto) {
        const user = await db.users.findOne({
            where: {
                email: dto.email
            }
        });

        if (user) {
            throw new Error("Esse usuário já foi cadastrado");
        }

        const t = await db.sequelize.transaction(); // Inicia uma transação
        
        try {
            
            const passwordHash = await hash(dto.password_hash, 6)
    
            const newUser = await db.users.create({
                id: dto.id,
                name: dto.name,
                email: dto.email,
                password_hash: passwordHash,
                status: dto.status,
            }, { transaction: t })
    
             // Verifica se o novo usuário foi criado com sucesso
            console.log("Novo usuário criado:", newUser);
    
            if(!dto.role_name){
                await t.rollback(); //Reverte a transação em caso de erro
                return res.status(400).json({
                    message: 'Perfil não fornecido'
                })
            }
    
            // Verifique se a role já existe
            const existingRole = await db.roles.findOne({
                where: { role_name: dto.role_name }
            });
    
            const roleName = existingRole.role_name
    
            if (!existingRole) {
                await t.rollback(); // Reverte a transação em caso de erro
                throw new Error('Perfil não encontrado!');
            } 
    
            // Associação do usuário ao role usando Users_Roles
            await db.users_roles.create({
                user_id: newUser.id,
                role_id: existingRole.id
            }, { transaction: t })
    
            // Confirma a transação, se todas as operações acima forem bem-sucedidas
            await t.commit();
    
            // Envie um email com os detalhes do usuário
            const mailOptions = {
                from: 'seuemail@gmail.com',
                to: dto.email,
                subject: 'Novo usuário registrado',
                text: `Olá ${dto.name},\n\nVocê foi registrado com sucesso em nosso sistema.\n\nDetalhes do usuário:\nID: ${dto.id}\nNome: ${dto.name}\nEmail: ${dto.email}\nStatus: ${dto.status}\nFunção: ${roleName}\n\nObrigado por se juntar a nós!`
            };
    
            this.transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.error('Erro ao enviar o email:', error);
                } else {
                    console.log('Email enviado:', info.response);
                }
            });
    
            return { newUser, roleName};
    
        } catch (error) {
            throw new Error(error, 'Erro ao cadastrar usuario')
        }
    }
    
    // Register new User
    // Search all Users
    async searchAllUsers(){
        try {
            const users = await db.users.findAll({
                include: [{
                    model: db.roles,
                    attributes: ['id', 'role_name', 'description'],
                    through: { 
                        attributes: []
                    }
                }]
            })
        
            return users;

        } catch(error) {
            throw Error('Não foi possível vizual')
        }
        
    };
    // Search one Users ID
    async searchUsersId(id){
        const user = await db.users.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.roles,
                attributes: ['id', 'role_name', 'description'],
                through: { 
                    attributes: []
                }
            }]
        });

        if (!user) {
            throw new Error("Esse usuário não existe")
        }

        return user;
    };
    // Edit User
    async editUser(dto) {
        
    }
    

    
    // Delete User ID
    async deleteUserId(id){
        await this.searchUsersId(id);

        try {
            await db.users.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o usuario! Tente novamente mais tarde')
        }
    }
}

module.exports = UserService;