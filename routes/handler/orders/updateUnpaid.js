const { Orders } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");

module.exports = async (req, res) => {
    const schema = {
        order_id: "number|empty:false",
        proof_payment: "string|empty:false",
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const image = req.body.proof_payment;
    if (!isBase64(image, {mimeRequired: true})) {
        return res.status(400).json({
            status: false,
            message: "invalid type base64"
        })
    }

    base64Img.img(image , './public/images/proof_payment', Date.now(), async (err, filepath) => {
        if (err) {
            return res.status(400).json({
                status: false,
                message: err.message
            })
        }

        const filename = filepath.split("\\").pop().split("/").pop();
        
        const updateUnpaid = await Orders.findOne({ where: { id: req.body.order_id } });
    
        if (!updateUnpaid) {
            return res.status(404).json({
                status: false,
                message: "data not found"
            })
        }
    
        await updateUnpaid.update({
            proof_payment: `images/proof_payment/${filename}`,
            verification: 'Paid',
        })
    
        return res.status(200).json({
            status: true,
            message: "successfully paid for the order",
            data: updateUnpaid.id
        })

    })

}