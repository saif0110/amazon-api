const Order = require('../model/order');


// get list of orders
const list = async (req, res) => {
    const userId = req.user._id
    try {
        const userData = await Order.findOne({ userId: userId }).populate({
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


// add product to orders.
const addToOrder = async (req, res) => {
    const userId = req.user._id;
    const productId = req.body.productId;
    const qty = req.body.qty;
    try {
        const userData = await Order.findOne({ userId: userId });
        if (!userData) {
            const detail = {
                userId: userId,
                list: [{
                    productId: productId,
                    qty: qty
                }]
            }
            const newOrderData = new Order(detail)
            await newOrderData.save();
        } else {
            userData.list = [{
                productId: productId,
                qty: qty
            }, ...userData.list];
            await userData.save();
        }
        res.status(200).json({
            success: true,
            message: "item added to order list."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error."
        })
    }
}

module.exports = {
    list,
    addToOrder
}