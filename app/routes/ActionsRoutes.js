const express = require('express')
const router = express.Router()
const ActionsController = require('../controllers/ActionsController')

module.exports = () => {
    //GET /actions
    router.get('/', ActionsController.index)

    //GET /actions/listAllActionsByClientId
    router.get('/clients/:clientId/actions', ActionsController.clientActions)

    //POST /actions/add
    router.post('/add', ActionsController.create)

    //PUT /actions/edit
    router.put('/edit/:id', ActionsController.edit)

    //DELETE /actions/delete/:id
    router.delete('/delete/:id', ActionsController.delete)

    return router
}