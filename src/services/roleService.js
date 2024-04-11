const db = require('../models')

class RoleService {
    // Register new Role
    async registerRole(dto) {
        const role = await db.roles.findOne({
            where: {
                role_name: dto.role_name
            }
        });

        if (role) {
            throw new Error("Esse perfil já foi cadastrado");
        }

        try {
            const newRole = await db.roles.create({
                id: dto.id,
                role_name: dto.role_name,
                description: dto.description,
            })

            return newRole;

        } catch (error) {
            throw new Error('Erro ao criar perfil de usuario')
        }
    };
    // Search all Roles
    async searchAllRoles() {
        const roles = await db.roles.findAll()

        return roles;
    };
    // Search one Roles ID
    async searchRolesId(id) {
        const user = await db.roles.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            throw new Error("Essa role não existe")
        }

        return user;
    };
    // Delete Role ID
    async deleteRoleId(id) {
        await this.searchRolesId(id);

        try {
            await db.roles.destroy({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw new Error('Erro ao tentar deletar o perfil! Tente novamente mais tarde')
        }
    }
    // Edit User
    async editRole(dto) {
        const role = await this.searchRolesId(dto.id);

        try {
            role.role_name = dto.role_name
            role.description = dto.description

            await role.save()

            return role
            
        } catch (error) {
            throw new Error('Erro ao editar usuario! Tente novamente mais tarde')
        }


    };
}

module.exports = RoleService;