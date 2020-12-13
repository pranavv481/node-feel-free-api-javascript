const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "category", required: true },
    isActive: { type: Boolean, default:true },
    discount: { type: Number, default: 0 },

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})

const productModel = mongoose.model("product", productSchema)

module.exports = { productModel }
