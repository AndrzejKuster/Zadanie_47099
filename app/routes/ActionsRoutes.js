const express = require('express')
const router = express.Router()
const ActionsController = require('../controllers/ActionsController')

module.exports = () => {
    //GET /actions
    router.get('/', ActionsController.index)

    //POST /actions/add
    router.post('/add', ActionsController.create)

    //DELETE /actions/delete/:id
    router.delete('/delete/:id', ActionsController.delete)

    return router
}