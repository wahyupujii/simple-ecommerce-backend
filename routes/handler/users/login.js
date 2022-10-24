const {Users} = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();
const jwt = require('jsonwebtoken');

const {
    JWT_SECRET_TOKEN,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

module.exports = async (req, res) => {
    const schema = {
        email: "email|empty:false",
        password: "string|min:6",
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const user = await Users.findOne({
        where: {email : req.body.email}
    });

    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'email not found'
        })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) {
        return res.status(404).json({
            status: false,
            message: 'user not found'
        })
    }

    // jwt
    const data = {
        id: user.id,
        email: user.email
    }

    const token = jwt.sign({ data }, JWT_SECRET_TOKEN, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

    return res.status(200).json({
        status: true,
        message: "user found",
        data: {
            name: user.name,
            email: user.email,
            token,
            refreshToken
        }
    })
}