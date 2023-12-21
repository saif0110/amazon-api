const Wishlist = require('../model/wishlist')

const list = async (req, res) => {
    const userId = req.user._id
    try {
        const userData = await Wishlist.findOne({userId: userId}).populate({
            path: 'list',
            populate: { path: 'productId' }
        });
        res.status(200).json({
            success: true,
            result: userData ? userData : []
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = {
    list
}