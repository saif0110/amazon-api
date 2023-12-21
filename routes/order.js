const router = require("express").Router();
const controller = require('../controller/order');

// show all buyed products with qty
router.get('/list', controller.list);
router.post('/add', controller.addToOrder);


// add product to the returns and orders.


module.exports = router;