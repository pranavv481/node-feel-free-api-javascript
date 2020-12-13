const express = require("express");
const categoryRouter = express.Router();
const { getCategories, postCategory, getCategory, getProductByCategory } = require("../controller/categoryController");
const { userAuthMiddlware, userAdminMiddlware } = require("../middleware/useAuthMiddleware");


categoryRouter.get("/", getCategories)
categoryRouter.post("/", userAdminMiddlware, postCategory)
categoryRouter.get("/:categoryId", getCategory)
categoryRouter.get("/:categoryId/products", getProductByCategory)

module.exports = { categoryRouter }
