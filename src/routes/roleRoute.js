const { Router } = require('express');
const RoleController = require('../controller/roleController')

const router = Router()

router
    .post('/roles', RoleController.registerRole)
    .get('/roles', RoleController.searchAllRoles)
    .get('/roles/id/:id', RoleController.searchRoleId)
    .delete('/roles/id/:id', RoleController.deleteRoleId)
    .put('/roles/id/:id', RoleController.editRole)

module.exports = router