const { Orders } = require("../../../models")

module.exports = async (req, res) => {
    // get 1 order with verification = "" (order not checkout)
    const order = await Orders.findOne({
        where: {
            verification: "",
            user_id: req.user.data.id
        }
    })

    if (!order) {
        return res.status(404).json({
            status: false,
            message: "data not found"
        })
    }

    return res.status(200).json({
        status: true,
        message: "data order",
        data: {
            id: order.id
        }
    })
}