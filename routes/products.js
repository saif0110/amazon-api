const router = require("express").Router();

const controller = require('../controller/products');

const myauthMiddleware = require('../middleware/tokenAuth');
// show all products
router.get('/list', controller.getAllItem)
// add product to the list
router.post('/add-to-collection', myauthMiddleware, controller.addNewProduct)
// add to wishlist
router.post('/add-to-wishlist', myauthMiddleware, controller.addToWishlist)

module.exports = router;