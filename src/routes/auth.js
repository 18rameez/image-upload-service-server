const router = require("express").Router()
const authController = require("../controller/authController");
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    res.redirect("/");
  } else {
    next();
  }
};

//router.get("/login", isAuth, authController.getLogin);
router.post("/login", authController.postLogin);

//router.get("/signup", isAuth, authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;