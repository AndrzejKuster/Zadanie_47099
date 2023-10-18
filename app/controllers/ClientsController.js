const ClientModel = require('../models/ClientModel')

module.exports = {
    index: (req, res, next) => {
        ClientModel.find()
            .then((result) => {
                console.log('to jest w bazie klientów: ', result)
                res.json(result)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Error while fetching clients !',
                    error: err
                })
            })

    },

    findOne: (req, res, next) => {
        ClientModel.findById(req.params.id)
            .then((result) => {
                console.log('Znaleziony klient: ', result)
                res.json(result)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Error while fetching clients !',
                    error: err
                })
            })

    },

    create: (req, res, next) => {
        const client = new ClientModel({
            name: req.body.name,
            address: req.body.address,
            NIP: req.body.NIP
        })

        client.save()
            .then((client) => {
                return res.status(201).json(client)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Error adding client',
                    error: err
                })
            })
    },

    find: async (req, res) => {
        // const clientNip = req.params.NIP;
        const searchTerm = req.query.searchTerm;
        console.log('REQ.QUERY: ',req.query.searchTerm);
        console.log('-----------');
        // console.log('nip z linku -', clientNip);
        console.log('-----------');
        try {
            const foundClient = await ClientModel.find({ NIP: new RegExp(searchTerm, 'i')});
            console.log('-----------');
            console.log('znaleziony klient -', foundClient);
            console.log('-----------');
            if (foundClient) {
                res.status(200).json(foundClient);
            } else {
                res.status(404).json({ message: "Client not found!" })
            }
        } catch (error) {
            console.error('Error finding client:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    edit: async (req, res, next) => {
        const id = req.params.id;
        const {name, address, NIP} = req.body;
        console.log('id:', id)
        console.log('req.body', req.body)
        await ClientModel.findByIdAndUpdate(id, req.body, { new: true })
            .then((id) => {
                return res.status(200).json({
                    name: name,
                    address: address,
                    NIP: NIP
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    message: "Error updating company fields!",
                    error: error
                })
            })
    },

    delete: (req, res, next) => {
        const id = req.params.id;
        console.log(id);
        ClientModel.findByIdAndRemove(id)
            .then((id) => {
                return res.status(200).json({
                    id: id,
                    deleted: true
                })
            })
            .catch((error) => {
                return res.status(500).json({
                    message: "Error while deleting client",
                    error: error
                })
            })
    }
}