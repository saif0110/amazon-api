const Product = require('../model/products');
const Wishlist = require('../model/wishlist')

// add product to the list
const addNewProduct = async (req, res) => {
    const productDetail = req.body;
    try {
        const newProduct = new Product(productDetail)
        await newProduct.save();
        res.status(200).json({
            success: true,
            message: "item successfuly added to the list."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

// get all product for show case.
const getAllItem = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            result: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

// add to wishlist
// move to wishlist.
const addToWishlist = async (req, res)=>{
    const userId = req.user._id;
    const productId = req.body.productId;
    try {
        // now add the data to the wishlist
        const userData = await Wishlist.findOne({userId: userId});
        if(!userData){
            const detail = {
                userId: userId,
                list: [{
                    productId: productId,
                    qty: 1
                }]
            }
            const newWishlistData = new Wishlist(detail)
            await newWishlistData.save();
        }else{
            userData.list = [{
                productId: productId,
                qty: 1
            }, ...userData.list];
            await userData.save();
        }

        res.status(200).json({
            success: true,
            message: "item added to the wishlist."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = {
    getAllItem,
    addNewProduct,
    addToWishlist
}