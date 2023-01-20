const {Cart, Orders} = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        order_id: "number|empty:false",
        product_id: "number|empty:false",
        price: "number|empty:false"
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    // check apakah product sudah ada di keranjang
    const checkProductCart = await Cart.findOne({where: { product_id: req.body.product_id, order_id: req.body.order_id }})    

    if (checkProductCart) {
        return res.status(400).json({
            status: false,
        })
    }

    const createCart = await Cart.create({
        order_id: req.body.order_id,
        product_id: req.body.product_id,
        count: 1,
        total_price: req.body.price
    })

    if (!createCart) {
        return res.status(400).json({
            status: false,
            message: "failed add to cart"
        })
    }

    return res.status(200).json({
        status: true,
        message: 'success add to cart',
        data: createCart.id
    })
}
