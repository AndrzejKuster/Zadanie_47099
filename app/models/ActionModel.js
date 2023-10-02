const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ActionSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    actionType: {
        key: {
            type: String,
            required: true
        },
        val: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    client_id: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    }
});

module.exports = mongoose.model('Action', ActionSchema)