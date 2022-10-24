const {Cart, Orders} = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
    const allCart = await Cart.sequelize.query(`select products.id, products.name, products.image, products.price, cart.total_price, cart.count
        from products
        inner join cart on cart.product_id=products.id
        inner join orders on orders.id=cart.order_id
        inner join users on users.id=orders.user_id
        where orders.user_id=${req.user.data.id} and orders.id=${req.params.order_id} and verification=""`);

    if (!allCart) {
        return res.status(400).json({
            status: false,
            message: 'no data exist'
        })
    }
    
    return res.status(200).json({
        status: true,
        message: 'user cart data',
        data: {
            products: allCart[0],
        }
    })

}


