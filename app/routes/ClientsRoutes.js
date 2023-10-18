const express = require('express')
const router = express.Router()
const ClientsControllers = require('../controllers/ClientsController')

module.exports = () => {
    //GET /clients
    router.get('/', ClientsControllers.index)

    //GET /clients/find
    router.get('/find', ClientsControllers.find)

    //GET /clients/findOne
    router.get('/findone/:id', ClientsControllers.findOne)

    //POST /clients/add
    router.post('/add', ClientsControllers.create)

    //PUT /clients/edit
    router.put('/edit/:id', ClientsControllers.edit)

    //DELETE /clients/delete/:id
    router.delete('/delete/:id', ClientsControllers.delete)
 
    return router
}