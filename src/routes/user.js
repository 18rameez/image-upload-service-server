const router = require("express").Router()
const userController = require("../controller/userController")
const jwt = require('jsonwebtoken');


router.get('/', userController.getIndex)



module.exports = router;