const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

module.exports = () => {

    //POST /user/add
    router.post('/add', UserController.create)

    //POST /user/find
    router.post('/find', UserController.find)

    return router;
}