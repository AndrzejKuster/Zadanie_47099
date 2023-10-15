const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.SECRET_KEY;

module.exports = {

    create: async (req, res, next) => {
        const user = new UserModel({
            username: req.body.username,
            password: req.body.password
        })

        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;

        user.save()
            .then((user) => {
                return res.status(201).json(user)
            })
            .catch((err) => {
                return res.status(500).json({
                    message: 'Error adding user',
                    error: err
                })
            })
    },

    find: async (req, res) => {
        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Niewłaściwe poswiadczenia!' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Niewłaściwe poswiadczenia!' });
        console.log("sekret key to: ",secretKey);
        const token = jwt.sign({ username: user.username, id: user._id }, secretKey);
        res.status(200).json({ token });
    }
}