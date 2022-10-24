const {Orders} = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

const { verifyToken, getRefreshToken } = require("../helpers")

module.exports = async (req, res) => {
    // check order saat ada order yang verification nya 'Pending'
    const checkOrderPending = await Orders.findOne({
        where: {
            user_id: req.user.data.id,
            verification: "Pending"
        }
    })

    if (checkOrderPending) {
        return res.status(400).json({
            status: false,
            message: "pending orders found",
        })
    }

    const checkOrderExist = await Orders.findOne({
        where: {
            user_id: req.user.data.id,
            verification: ""
        }
    })

    if (checkOrderExist) {
        return res.status(200).json({
            status: true,
            message: "order unpending found",
            data: checkOrderExist.id
        })
    }

    const order = await Orders.create({
        user_id: req.user.data.id,
        ammount: 0,
        verification: "",
        payment_method: "",
        proof_payment: "",
    })

    if (!order) {
        return res.status(400).json({
            status: false,
            message: "failed make order"
        })
    }

    return res.status(200).json({
        status: true,
        message: "success make order",
        data: order.id
    })
}
