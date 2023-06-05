const {Products} = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();
const isBase64 = require("is-base64");
const base64Img = require("base64-img");

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        description: 'string|empty:false',
        price: 'number|empty:false',
        image: 'string|empty:false',
        quantity: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const image = req.body.image
    if (!isBase64(image , {mimeRequired: true})) {
        return res.status(400).json({ status: false , message: 'invalid type base64' })
    }

    // upload gambar
    base64Img.img(image , './public/images/products', Date.now(), async (err , filepath) => {
        if (err) {
            return res.status(400).json({status: false, message: err.message})
        }
        
        const filename = filepath.split("\\").pop().split("/").pop();
        // const media = await Media.create({
        //     image: `image/${filename}`
        // });
        const checkProductExist = await Products.findOne({
            where: {
                name: req.body.name,
                description: req.body.description
            }
        })
    
        if (checkProductExist) {
            return res.status(400).json({
                status: false,
                message: 'product exist'
            })
        }
    
        const createProduct = await Products.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: `images/products/${filename}`,
            quantity: req.body.quantity,
        })
    
        if (!createProduct) {
            return res.status(400).json({
                status: false,
                message: 'create product failed'
            })
        }
    
        return res.status(201).json({
            status: true,
            message: 'product created',
            data: {
                ...createProduct,
                image: `${req.get('host')}/images/products/${filename}`
            }
        })
    })
}
