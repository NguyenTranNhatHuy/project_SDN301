const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Topping = require('./topping')
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const quizSchema = new Schema({
    type: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    price: { type: Currency, required: true, min: 0 },
    topping: [{
        type: Schema.Types.ObjectId,
        ref: 'Topping',
        required: true
    }]
}, {
    timestamps: true
})

const Cake = mongoose.model('Cake', quizSchema)

module.exports = Cake;