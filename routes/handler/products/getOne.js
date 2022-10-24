const {Products} = require("../../../models");

module.exports = async (req, res) => {
    const product = await Products.findOne({
        where: { id: req.params.id }
    })

    if (!product) {
        return res.status(400).json({
            status: false,
            message: 'failed get data'
        })
    }

    return res.status(200).json({
        status: true,
        message: `data product id ${req.params.id}`,
        data: product
    })
}