const { categoryModel } = require("../models/category");

const Joi = require('joi');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const { productModel } = require("../models/product");

async function getCategories(req, res, next) {
    const user = await categoryModel.find();
    res.json(user)
}

async function postCategory(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    }

    const categoryObj = new categoryModel(result.value)
    const category = await categoryObj.save();  
    res.json(category)
}


async function getCategory(req, res, next) {
    const _id = req.params.categoryId;
    const user = await categoryModel.findOne({_id});
    res.json(user)
}


async function getProductByCategory(req, res, next) {
    const _id = req.params.categoryId;
    const products = await productModel.find({category:_id}).populate('category')
    res.json(products)
}



module.exports = { getCategories, postCategory, getCategory, getProductByCategory }