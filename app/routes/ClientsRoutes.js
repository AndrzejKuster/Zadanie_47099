const express = require('express')
const router = express.Router()
const ClientsControllers = require('../controllers/ClientsController')

module.exports = () => {
    //GET /clients
    router.get('/', ClientsControllers.index)

    //POST /clients/add
    router.post('/add', ClientsControllers.create)

    //DELETE /clients/delete/:id
    router.delete('/delete/:id', ClientsControllers.delete)
 
    return router
}