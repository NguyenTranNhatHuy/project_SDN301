const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const cakeSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    urlImage: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    price: { type: String, required: true },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // topping: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Topping',
    //     required: true
    // }]
}, {
    timestamps: true
})

const Cake = mongoose.model('Cake', cakeSchema)

module.exports = Cake;