const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    isAdmin: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    password: { type: String, required: true },
    repassword: { type: String, required: true },
})

const userModel = mongoose.model("user", userSchema)

module.exports = { userModel }
