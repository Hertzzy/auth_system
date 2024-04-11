const RoleService = require('../services/roleService')
const roleService = new RoleService()

class RoleController {
    // Register Doc
    static async registerRole(req, res) {

        const {
            role_name,
            description,
        } = req.body;

        try {
            const role = await roleService.registerRole({
                role_name,
                description
            })

            console.log(role)

            res.status(201).send(role)
            
        } catch (error) {
            // console.log(error)
            res.status(400).send({
                message: error.message
            })
        }
    }
    // Search all Users
    static async searchAllRoles(req, res) {
        const roles = await roleService.searchAllRoles()

        res.status(200).json(roles);
    }
    // Search Role ID
    static async searchRoleId(req, res) {
        try {
            const {
                id
            } = req.params
            const role = await roleService.searchRolesId(id)

            res.status(200).json(role);

        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }
    // Delete Role ID
    static async deleteRoleId(req, res) {
        const {
            id
        } = req.params;
        try {
            await roleService.deleteRoleId(id);

            res.status(200).send({
                message: 'Usuario deletado com sucesso!'
            })
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }
    // Editar role
    static async editRole(req, res) {
        const {
            id
        } = req.params;

        const {
            role_name,
            description,
        } = req.body;

        try {
            const role = await roleService.editRole({
                id,
                role_name,
                description,
            })

            res.status(200).json(role)

        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

}

module.exports = RoleController