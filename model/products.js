const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    rating: {
        type: Map
    }
})

module.exports = mongoose.model("products", ProductsSchema);