const {Products} = require("../../../models");

module.exports = async (req, res) => {
    const products = await Products.findAll({
	order: [
		['id', 'DESC']
	]
    });

    if (!products) {
        return res.status(400).json({
            status: false,
            message: 'failed get data'
        })
    }

    return res.status(200).json({
        status: true,
        message: 'all data products',
        data: products
    })
}
