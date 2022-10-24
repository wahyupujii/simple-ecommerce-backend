const { Orders, Cart } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator()

module.exports = async (req, res) => {
    const schema = {
        order_id: "number|empty:false"
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const order = await Orders.findOne({ where: { id: req.body.order_id } });

    if (!order) {
        return res.status(404).json({
            status: false,
            message: "data not found"
        })
    }

    const cartDelete = await Cart.destroy({
        where: {
            order_id: req.body.order_id
        }
    }) 
    
    const orderDelete = await order.destroy();

    if (!cartDelete && !orderDelete) {
        return res.status(400).json({
            status: false,
            message: "failed delete data"
        })
    }

    return res.status(200).json({
        status: true,
        message: "success delete data"
    })
}