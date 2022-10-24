const express = require('express');
const router = express.Router();

const usersHandler = require("./handler/users");

const { verifyRefreshToken } = require("./handler/helpers");

router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);

router.post('/refresh-token', verifyRefreshToken, usersHandler.refreshToken);

module.exports = router;
