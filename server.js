const express = require("express");
const handleError = require("./middleware/handleError");
require('express-async-errors');
const app = express();
const morgan = require('morgan');
const helmet = require("helmet");
const cors = require('cors')
const PORT = process.env.PORT || 4001;
const {connection} = require("./database/connection");
const {categoryRouter, userRouter, productRouter, orderRouter} = require("./router/router");

// throw new Error("Error on startup")
// Promise.reject(new Error("From Promises")).then(r=>{
//     console.log(r)
// },err=>{
//     console.log(err)
// })
// Promise.reject(new Error("promise rejected"))
var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(helmet());


const apiRouter = express.Router();
app.use("/api", apiRouter)
apiRouter.use("/users", userRouter)
apiRouter.use("/categories", categoryRouter)
apiRouter.use("/products", productRouter)
apiRouter.use("/orders", orderRouter)
apiRouter.get("/"+process.env.UPLOAD_FOLFER+"/*", (req, res, next)=>{
    const path = req.url;
    const filePath = `${__dirname}${path}`
    // console.log(__dirname)
    // console.log(filePath)
    res.sendFile(filePath, (err)=>{
        next()
    })
})


app.use(handleError)

console.log("starting application on server.js")

module.exports = {app}