const Cart = require('../model/cart');
const Wishlist = require('../model/wishlist')
// getting all item from cart
const getAllItem = async (req, res) => {
    const userId = req.user._id;
    try {
        const list = await Cart.findOne({userId: userId}).populate({
            path: 'list',
            populate: { path: 'productId' }
        });
        res.status(200).json({
            success: true,
            result: list ? list : []
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }

}

// add item to the cart.
const addItem = async (req, res) => {
    const userId = req.user._id;
    const productId = req.body.productId;
    const qty = req.body.qty;
    try {
        const userData = await Cart.findOne({userId: userId});
        if(!userData){
            const detail = {
                userId: userId,
                list: [{
                    productId: productId,
                    qty: qty
                }]
            }
            const newWishlistData = new Cart(detail)
            await newWishlistData.save();
        }else{
            userData.list = [{
                productId: productId,
                qty: qty
            }, ...userData.list];
            // await Cart.findByIdAndDelete(userId);
            await userData.save();
        }
        res.status(200).json({
            success: true,
            message: "item added to the cart."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }

}

// delete item from cart.
const deleteItem = async (req, res) => {
    const userId = req.user._id;
    const productId = req.body.productId;
    const qty = req.body.qty;
    try {
        const userData = await Cart.findOne({userId: userId})
        const list = userData.list;
        const newList = list.filter(obj => {
            return !((obj.productId == productId) && (obj.qty == qty))
        })
        userData.list = newList;
        await userData.save();
        res.status(200).json({
            success: true,
            message: "item deleted."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

// move to wishlist.
const moveToWishlist = async (req, res)=>{
    const userId = req.user._id;
    const productId = req.body.productId;
    const qty = req.body.qty;
    try {
        // first delete the item from cart
        const cartUserData = await Cart.findOne({userId: userId})
        const list = cartUserData.list;
        const newList = list.filter(obj => {
            return !((obj.productId == productId) && (obj.qty == qty))
        })
        cartUserData.list = newList;
        await cartUserData.save();

        // now add the data to the wishlist
        const userData = await Wishlist.findOne({userId: userId});
        if(!userData){
            const detail = {
                userId: userId,
                list: [{
                    productId: productId,
                    qty: qty
                }]
            }
            const newWishlistData = new Wishlist(detail)
            await newWishlistData.save();
        }else{
            userData.list = [{
                productId: productId,
                qty: qty
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
    deleteItem,
    addItem,
    moveToWishlist
}