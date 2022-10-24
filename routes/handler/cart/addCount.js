const { Cart, Products } = require('../../../models');
const Validator = require('fastest-validator');
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

    const product = await Products.findOne({
        where: {id: req.body.product_id},
        attributes: ['price', 'quantity']
    }) 

    const productCart = await Cart.findOne({
        where: { order_id: req.body.order_id, product_id: req.body.product_id }
    })

    if (!productCart || !product) {
        return res.status(400).json({
            status: false,
            message: 'data not found'
        })
    }

    if ((productCart.count + 1) > product.quantity) {
        return res.status(400).json({
            status: false,
            message: 'exceed product quantity'
        })
    }

    await productCart.update({
        count: productCart.count+1,
        total_price: product.price * (productCart.count+1)
    })

    return res.status(200).json({
        status: true,
        message: 'success add product count',
        data: {
            count: productCart.count,
            total_price: productCart.total_price
        }
    })
}