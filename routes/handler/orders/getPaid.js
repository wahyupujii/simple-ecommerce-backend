const { Cart, Orders } = require("../../../models");

module.exports = async (req, res) => {
    const paidOrder = await Orders.findOne({
        where: {
            user_id: req.user.data.id,
            verification: "Paid"
        }
    })

    if (!paidOrder) {
        return res.status(404).json({
            status: false,
            message: "data not found"
        })
    }

    const productOrder = await Cart.sequelize.query(`select products.id, products.name, products.image, products.price, cart.total_price, cart.count
        from products
        inner join cart on cart.product_id=products.id
        inner join orders on orders.id=cart.order_id
        inner join users on users.id=orders.user_id
        where orders.user_id=${req.user.data.id} and orders.id=${paidOrder.id}`);


    return res.status(200).json({
        status: true,
        message: "data paid order",
        data: {
            order: paidOrder,
            product: productOrder[0]
        }
    })
}