const mongoose = require('mongoose')

const BrandSchema = new mongoose.Schema({
    brandName: {
        type: String,
    },
    merchandiser: {
        type: String,
    },
   
})

module.exports = mongoose.model('Brand', BrandSchema)

