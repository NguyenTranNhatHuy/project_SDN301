const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toppingSchema = new Schema({
    type: {
        type: String,
        required: true
    },

    price_extra: {
        type: Number,
        required: true
    },


}, {
    timestamps: true
})

const Topping = mongoose.model('Topping', toppingSchema)

module.exports = Topping; 