const express = require("express");
const userRouter =  express.Router();
const {getUsers, postUsers, loginUsers, updateUser, updateUserByAdmin} = require("../controller/userController");
const { userAuthMiddlware, userAdminMiddlware } = require("../middleware/useAuthMiddleware");
const {getOrdersByUser} = require("../controller/orderController")

userRouter.get("/", userAdminMiddlware, getUsers)
userRouter.get("/:userId/orders", getOrdersByUser)
userRouter.post("/", postUsers)
userRouter.put("/", userAuthMiddlware, updateUser)
userRouter.put("/:user_id", userAdminMiddlware, updateUserByAdmin)
userRouter.post("/login",  loginUsers)

module.exports = {userRouter}
