const express = require("express");
const orderRouter =  express.Router();
const {getOrders, placeOrder, deleteOrder, updateOrder} = require("../controller/orderController");
const { userAuthMiddlware, userAdminMiddlware } = require("../middleware/useAuthMiddleware");

orderRouter.get("/",userAuthMiddlware, getOrders)
orderRouter.post("/",userAuthMiddlware, placeOrder)
orderRouter.delete("/:orderId",userAuthMiddlware, deleteOrder)
orderRouter.put("/:orderId",userAuthMiddlware, updateOrder)

module.exports = {orderRouter}
