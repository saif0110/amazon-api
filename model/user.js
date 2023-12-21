const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type:  String,
        required: true,
        min: 3,
        max: 20
    },
    phone: {
        type: String,
        required: true,
        min: 10,
        max: 10,
        unique: true
    },
    email: {
        type: String,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    token: {
        type: String,
        default: ""
    }
}, {timestamps: true}
)

module.exports = mongoose.model("users", UserSchema);