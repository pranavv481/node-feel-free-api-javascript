const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer')
const productRouter = express.Router();
const { getProducts, postProduct, getProduct } = require("../controller/productController");
const { userAuthMiddlware, userAdminMiddlware } = require("../middleware/useAuthMiddleware");

var upload = multer({ dest: process.env.UPLOAD_FOLFER })
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.UPLOAD_FOLFER)
    },
    filename: function (req, file, cb) {
        const fileName = mongoose.Types.ObjectId()+'.png'
      cb(null,fileName)
    }
  })
   
  var upload = multer({ storage: storage })


productRouter.get("/", getProducts)
productRouter.post("/", userAdminMiddlware, upload.single('image'), userAdminMiddlware, postProduct)
productRouter.get("/:productId", getProduct)

module.exports = { productRouter }
