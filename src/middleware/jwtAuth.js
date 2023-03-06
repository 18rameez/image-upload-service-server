const jwt = require('jsonwebtoken');

const secretKey = '8454dbad43ee0ba1d6511a887367f26ca158fd78be75f619b6cdfbb9a2eb0288'
exports.jwtAuth = (req, res,next) => {

    const token = req.cookies.token;

    try {
        const user = jwt.verify(token, secretKey)
        req.user =user;
        next();
    } catch (error) {
        res.clearCookie("token")
        return res.redirect("/login")
    }
}