const {
    JWT_SECRET_TOKEN,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
    const { iat, exp, ...others } = req.user;

    const accessToken = jwt.sign({...others}, JWT_SECRET_TOKEN, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
    const refreshToken = jwt.sign({...others}, JWT_SECRET_REFRESH_TOKEN, {expiresIn: JWT_REFRESH_TOKEN_EXPIRED});

    return res.status(200).json({
        status: true,
        data: {
            token: accessToken, 
            refreshToken,
            email: req.user.email
        }
    })
}