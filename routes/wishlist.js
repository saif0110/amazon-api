const router = require("express").Router();

const controller = require('../controller/wishlist');

// get list from wsihlist.
router.get('/list', controller.list)

// delete from wishlist
// router.post('add', controller.addToWishlist)



module.exports = router;