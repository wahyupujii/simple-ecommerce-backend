const express = require('express');
const router = express.Router();

const ordersHandler = require("./handler/orders");

// middleware
const { verifyToken } = require("./handler/helpers")

/* GET users listing. */

router.get('/', ordersHandler.getAll);
router.post('/', verifyToken, ordersHandler.create);
router.put('/checkout', verifyToken, ordersHandler.update);
router.delete('/delete', ordersHandler.destroy);

router.get('/unpaid', verifyToken, ordersHandler.getUnpaid);
router.put('/update-unpaid', ordersHandler.updateUnpaid);

router.get('/paid', verifyToken, ordersHandler.getPaid);

router.get('/get-unverified-order', ordersHandler.getUnverifOrder)

module.exports = router;
