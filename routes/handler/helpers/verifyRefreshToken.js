const jwt = require("jsonwebtoken");
const {
    JWT_SECRET_REFRESH_TOKEN
} = process.env;

module.exports = async (req, res, next) => {
    const { email, token } = req.body;

    jwt.verify(token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
        if (err) return res.status(401).json({ status: false, message: err.message });

        if (decoded.data.email === email) {
            req.user = decoded
            next()
        } else {
            return res.status(400).json({
                status: false,
                message: "email wrong"
            })
        }
    })
}