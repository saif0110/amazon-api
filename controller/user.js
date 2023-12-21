const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const User = require('../model/user');

const secretKey = "Amazon Clone Secret Key";
const registration = async (req, res) => {
    const userData = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(userData.password, salt);
        userData.password = passHash;
        const userExists = await User.findOne({ phone: userData.phone });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "user already registered."
            })
        }
        const newUser = new User(userData);
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "registration successful."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

const login = async (req, res) => {
    const user = req.body;
    try {
        let userExists;
        if (user.phone) {
            userExists = await User.findOne({ phone: user.phone })
        }else{
            userExists = await User.findOne({ email: user.email})
        }
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "user not found."
            })
        }
        const isSamePass = await bcrypt.compare(user.password, userExists.password);
        if (!isSamePass) {
            return res.status(400).json({
                success: false,
                message: "username or password is wrong"
            })
        }
        const payload = {
            userId: userExists._id,
            phone: user.phone ? user.phone : user.email,
            exp: Math.floor((new Date()) / 1000) + 3600
        }
        const token = jwt.sign(payload, secretKey);
        await User.findByIdAndUpdate(userExists._id, {token: token})
        res.status(200).json({
            success: true,
            mesage: "login successful.",
            token: token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }

}


module.exports = {
    registration,
    login
}