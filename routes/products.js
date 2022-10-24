const express = require('express');
const router = express.Router();

const productsHandler = require("./handler/products");

/* GET users listing. */
router.get('/', productsHandler.getAll);
router.get('/:id', productsHandler.getOne);
router.post('/', productsHandler.create);

module.exports = router;
