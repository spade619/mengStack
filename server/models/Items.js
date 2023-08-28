const mongoose = require('mongoose')

const ItemsSchema = new mongoose.Schema({
    productName: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    brandID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    },
})

module.exports = mongoose.model('Items', ItemsSchema)