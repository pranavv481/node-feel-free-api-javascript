const { orderModel } = require("../models/order")
const { productModel } = require("../models/product")
const Joi = require('joi');


async function getOrders(req, res, next) {
    // const orders = await orderModel.find().populate('product user');
    const orders = await orderModel.find()
    .populate([
        {
            path:"product" ,
            populate:[
            {
                path:"category"
            }
        ]},
        {path:"user", select:"-password -repassword"},
    ]);
    res.json({orders})
}

async function placeOrder(req, res, next) {
    const schema = Joi.object({
        orders: Joi.array().items({
            product: Joi.string().required(),
            user: Joi.string().required(),
            address: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
            price: Joi.string().required(),
        }).min(1).required()
    })
    const result = schema.validate(req.body);
    console.log(result)
    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    }
    console.log(result.value)

  const order = await orderModel.create(result.value.orders)
   res.json({order:order})
    
}

async function getOrdersByUser(req, res, next) {
    const user = req.params.userId;
    const order = await orderModel.find({user}).populate('product')
    console.log(order)
    res.json({order})
}

async function deleteOrder(req, res, next) {
    const _id = req.params.orderId;
    const order = await orderModel.deleteOne({_id})
    console.log(order)
    res.json(order)
}

async function updateOrder(req, res, next) {
    const _id = req.params.orderId;
    const schema = Joi.object({
            product: Joi.string(),
            user: Joi.string(),
            address: Joi.string(),
            quantity: Joi.number().min(1),
            price: Joi.string(),
            status:Joi.boolean(),
            payment_method:Joi.string()
    })
    const result = schema.validate(req.body);
    console.log(result)
    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    }
    if(result.value.product){
        const product = await productModel.findById(result.value.product)
        result.value.price = product.price 
    }
    const order = await orderModel.findOneAndUpdate({_id}, {$set:result.value}, {new:true})
    console.log(order)
    res.json(order)
}

module.exports = { getOrders, placeOrder, getOrdersByUser, deleteOrder, updateOrder }