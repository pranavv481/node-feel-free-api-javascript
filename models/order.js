const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    user: { type:mongoose.Types.ObjectId, ref:'user', required:true },
    product: { type:mongoose.Types.ObjectId, ref:'product', required: true },
    price: { type: String, required: true },
    address: { type:String, required:true },
    quantity: { type: Number, required:true },
    payment_method: { type: String, default:"COD" },
    status: { type: Boolean, default: false },
    //active: { type: String, default: true },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = { orderModel }
