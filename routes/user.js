const router = require("express").Router();

const controller = require('../controller/user');
// REGISTRATION
router.post('/register', controller.registration);

// LOGIN
router.post('/login', controller.login);

module.exports = router;