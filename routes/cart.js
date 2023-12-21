const router = require("express").Router();

const controller = require('../controller/cart');

// get all data from cart. 
router.get('/list', controller.getAllItem);
router.post('/delete', controller.deleteItem);
router.post('/add', controller.addItem);
router.post('/move-to-wishlist', controller.moveToWishlist);
// delete item from cart.

// move data to wishlist.


module.exports = router;