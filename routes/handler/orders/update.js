const {Orders} = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator()

module.exports = async (req, res) => {
    const schema = {
        order_id: "number|empty:false",
        payment_method: "string|empty:false",
        ammount: "number|empty:false",
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const order = await Orders.findOne({
        where: {
            id: req.body.order_id,
            user_id: req.user.data.id,
        }
    })

    if (!order) {
        return res.status(404).json({
            status: false,
            message: 'order not found'
        })
    }

    await order.update({
        payment_method: req.body.payment_method,
        ammount: req.body.ammount,
        verification: 'Pending'
    })

    return res.status(200).json({
        status: true,
        message: 'success update order'
    })
}