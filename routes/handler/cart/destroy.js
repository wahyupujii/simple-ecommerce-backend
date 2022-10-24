const { Cart } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        order_id: "number|empty:false",
        product_id: "number|empty:false",
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const productCart = await Cart.findOne({
        where: { product_id: req.body.product_id, order_id: req.body.order_id }
    });

    if (!productCart) {
        return res.status(404).json({
            status: false,
            message: "data not found"
        })
    }

    await productCart.destroy();

    return res.status(200).json({
        status: true,
        message: 'success delete product from cart',
    })
}
