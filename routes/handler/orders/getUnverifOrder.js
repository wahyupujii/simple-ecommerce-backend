const { Cart, Orders } = require("../../../models");

module.exports = async (req, res) => {
    const unverifOrders = await Orders.findAll({
        where: {
            verification: "Pending"
        }
    })

    if (!unverifOrders) {
        return res.status(404).json({
            status: false,
            message: "no data found"
        })
    }

    return await res.status(200).json({
        status: true,
        message: "data unverified order",
        data: unverifOrders
    })
}