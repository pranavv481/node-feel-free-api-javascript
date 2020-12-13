const { productModel } = require("../models/product")
const Joi = require('joi');

async function getProducts(req, res, next) {
    const limit = parseInt(req.query.pagesize) || 20 ;
    const page = parseInt(req.query.page) || 1 ;
    const skip = limit*(page-1);
    const sort_by = req.query.sort;
    const product = await productModel.find().sort(sort_by).skip(skip).limit(parseInt(limit));
    const count = await productModel.countDocuments();
    res.json({product, count})
}

async function postProduct(req, res, next) {
    
    // res.json({message:"post handler"})
    const productImage = process.env.UPLOAD_FOLFER+"/"+req.file.filename;
    console.log(productImage)
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        price: Joi.number().min(1).required(),
        // productImage: Joi.String().required(),
        category:Joi.string().required(),
    })
    
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    }
    console.log(result.value)
    const productObj = new productModel({
        ...result.value,
        productImage
    });
    // console.log(productImage)
    const product = await productObj.save()
    console.log(product)
    res.json(product)
}

async function getProduct(req, res, next) {
    const _id = req.params.productId
    const product = await productModel.findOne({_id});
    res.json(product)
}



module.exports = { getProducts, postProduct, getProduct }