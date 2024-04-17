var express = require('express');
var router = express.Router();
const loginController = require("../controllers/login_controller")

router.post("/", loginController.login)

module.exports = router;