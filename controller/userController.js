const { userModel } = require("../models/user")
const Joi = require('joi');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

async function getUsers(req, res, next) {
    const limit = parseInt(req.query.pagesize) || 20 ;
    const page = parseInt(req.query.page) || 1 ;
    const skip = limit*(page-1);
    const sort_by = req.query.sort;
    console.log(limit)
    const user = await userModel.find().sort(sort_by).skip(skip).limit(parseInt(limit));
    const count = await userModel.countDocuments();
    res.json({user, count})
}

async function postUsers(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
        repassword: Joi.string().min(3).max(30).required()
    })

    const result = schema.validate(req.body);


    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    }
    if (result.value.password != result.value.repassword) {
        res.status(400)
        return next(new Error("Password is not same"));
    }

    result.value.password = passwordHash.generate(req.body.password);

    const checkEmailExist = await userModel.findOne({ email: req.body.email })
    if (checkEmailExist) {
        res.status(400)
        return next(new Error("Email is already present"));
    }

    const userObj = new userModel(result.value);
    const user = await userObj.save()
    res.json(user)
}


async function loginUsers(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    }
    const {email, password} = result.value
    const checkEmail = await userModel.findOne({email})
    if(!checkEmail){
        res.status(400)
        return next(new Error("Invalid User"))
    }
    else{ 
        //verfy password
       const user = passwordHash.verify(password,checkEmail.password);
       if(!user){
        res.status(400)
        return next(new Error("Invalid User"))
       }
       const payload = {
           _id:checkEmail._id,
           isAdmin: checkEmail.isAdmin,
           email: checkEmail.email
       } 
       const token = jwt.sign(payload, process.env.JWT_KEY);
       res.json({message:"Successful login",token})
    }

}


async function updateUser(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
        repassword: Joi.string().min(3).max(30).required()
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    }
    result.value.password = passwordHash.generate(req.body.password);
    const loginUserId = req.session.user
    console.log(loginUserId, "ssssssssss")
    console.log(result.value)
    const user = await userModel.findOneAndUpdate({_id:loginUserId._id}, {$set:result.value}, {new:true});
    res.json(user)

}


async function updateUserByAdmin(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        phone: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
        repassword: Joi.string().min(3).max(30).required()
    })

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400)
        return next(new Error(result.error.details[0].message))
    }
    result.value.password = passwordHash.generate(req.body.password);
    const _id = req.params.user_id;
    
    const user = await userModel.findOneAndUpdate({_id}, {$set:result.value}, {new:true});
    res.json(user)

}





module.exports = { getUsers, postUsers, loginUsers, updateUser, updateUserByAdmin }