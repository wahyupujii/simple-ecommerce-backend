const { Users } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();
const jwt = require("jsonwebtoken");

const {
    JWT_SECRET_TOKEN,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env

module.exports = async (req, res) => {
    const schema = {
        name: "string|empty:false",
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
        where: { email: req.body.email }
    });

    if (user) {
        return res.status(409).json({
            status: false,
            message: 'email exist'
        })
    }

    const password = await bcrypt.hash(req.body.password, 10);

    const data = {
        password,
        real_password: req.body.password,
        name: req.body.name,
        email: req.body.email
    }

    const createUser = await Users.create(data);

    const token = jwt.sign({ id: createUser.id, email: req.body.email }, JWT_SECRET_TOKEN, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED });
    const refreshToken = jwt.sign({ id: createUser.id, email: req.body.email }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED });

    return res.status(201).json({
        status: true,
        message: 'register success',
        data: {
            name: req.body.name,
            email: req.body.email,
            token,
            refreshToken
        }
    })
}