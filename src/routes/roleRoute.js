const { Router } = require('express');
const RoleController = require('../controller/roleController')
const authentication = require('../middleware/authentication')

const router = Router()

router
    .post('/roles', authentication, RoleController.registerRole)
    .get('/roles', authentication, RoleController.searchAllRoles)
    .get('/roles/id/:id',authentication, RoleController.searchRoleId)
    .delete('/roles/id/:id',authentication, RoleController.deleteRoleId)
    .put('/roles/id/:id', authentication, RoleController.editRole)

module.exports = router