require('dotenv').config()
const {app} = require("./server");
require("./logger/logger")

console.log("starting application on index.js")
app.listen(process.env.PORT, ()=>{
    console.log(`server started ${process.env.PORT}`)
})

