const jwt = require("jsonwebtoken")
const {
    JWT_SECRET_TOKEN,
} = process.env

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET_TOKEN, (err, decoded) => {
            if (err) return res.status(401).json({ status: false, message: err.message })
            req.user = decoded
            next();
        })
    } else {
        return res.status(401).json({
            status: false,
            message: "something error"
        })
    }

}