const ClientModel = require('../models/ClientModel')

module.exports = {
    index: (req,res,next) => {
        res.send('indexClients')
    },
    create: (req,res,next) => {
        const client = new ClientModel({
            name: req.body.name,
            address: req.body.address,
            NIP: req.body.NIP
        })

    client.save() 
       .then((client) => {
        return res.status(201).json(client)
       })
        .catch ((err) => {
            return res.status(500).json({
                message: 'Error adding client',
                error: err
            })
        })
    },
        
    delete: (req,res,next) => {
        res.send('deleteClient')
    }
}