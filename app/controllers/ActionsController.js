const ActionModel = require('../models/ActionModel')

module.exports = {
    index: (req, res, next) => {
        res.json({
            actions: [
                {
                    date: "data",
                    type: { key: 'phone', val: 'telefon' },
                    description: "testowy opis"
                },
                {
                    date: "data",
                    type: { key: 'meet', val: 'spotkanie' },
                    description: "testowy opis2"
                }
            ]
        })
    },

    create: (req, res, next) => {
        
        const action = new ActionModel({
            date: req.body.date,
            actionType: req.body.actionType,
            description: req.body.description,
            client_id: req.body.client_id
        })
        console.log(req.body);
        action.save()
            .then((action) => {
                return res.status(201).json(action)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Error adding action',
                    error: err
                })
            })
    },

    delete: (req, res, next) => {
        res.send('deleteAction')
    },
}