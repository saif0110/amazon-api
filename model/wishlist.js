const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    list: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        qty: Number
    }]
})

module.exports = mongoose.model("wishlist", WishlistSchema);