var express = require('express');
var router = express.Router();
const userController = require("../controllers/user_controller")

router.post('/', userController.createUser)
router.get('/:id', userController.getUserById)

module.exports = router;
