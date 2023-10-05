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

    clientActions: (req, res, next) => {
        const clientid = req.params.clientId;
        console.log('client_id: ', clientid)
        ActionModel.find({client_id: clientid})
        .then ((result) => {
            return res.status(200).json(result)
        })
        .catch ((error) => {
            return res.status(500).json({
                message: "Error displaying client actions!",
                error: error
            })
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

    edit: (req, res, next) => {
        const id = req.params.id;
        const {date, actionType, description, clientId} = req.body;
        ActionModel.findByIdAndUpdate(id, req.body, {new: true})
        .then((id) => {
            return res.status(200).json({
                date: date,
                actionType: actionType,
                description: description,
                clientId: clientId
            });
        })
        .catch((err) => {
            return res.status(500).json({
                message: "Error updating action!",
                error: error
            })
        })
    },

    delete: (req, res, next) => {
        res.send('deleteAction')
    },
}