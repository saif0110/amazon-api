const jwt = require("jsonwebtoken")
const User = require("../model/user")

const jwtSecretKey = "Amazon Clone Secret Key";
const myauthMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    // if user token not passed
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "please pass the user token"
        })
    }
    // if token expired
    const now = Math.floor(Date.now() / 1000)
    const exp = Math.floor(Date.now() / 1000) + 3600
    if (now > exp) {
        return res.status(400).json({
            success: false,
            message: "token expired"
        })
    }
    // if token is not of our API
    try {
        const isTokenVerified = jwt.verify(token, jwtSecretKey)
        if (!isTokenVerified) {
            return res.status(400).json({
                success: false,
                message: "please pass the correct token"
            })
        }
    }catch(error){
        console.log(error);
    }
    const decodedToken = jwt.decode(token)
    const user = await User.findById(decodedToken.userId)
    // if users token and passed token are not same
    if(!user || token !== user.token){
        return res.status(400).json({
            success: false,
            message: "please pass the correct token"
        })
    }

    req.user = user;
    next();
}

module.exports = myauthMiddleware