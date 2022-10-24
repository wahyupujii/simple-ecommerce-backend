const express = require('express');
const router = express.Router();

const cartHandler = require("./handler/cart");

const { verifyToken } = require("./handler/helpers");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/user-cart/:order_id', verifyToken, cartHandler.getAll);
router.post('/user-cart', cartHandler.create);
router.delete('/user-cart', cartHandler.destroy);
router.post('/user-cart/add-count', cartHandler.addCount);
router.post('/user-cart/minus-count', cartHandler.minusCount);

router.get('/get-by-order-pending/:user_id/:order_id', cartHandler.getByOrderPending);
module.exports = router;
