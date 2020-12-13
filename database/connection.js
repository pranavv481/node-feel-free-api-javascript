const mongoose = require("mongoose");
// const DB_URL = "mongodb://localhost/ecom4"
const connection = mongoose.connect(process.env.DB_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false
})
.then(()=>{
    console.log("connected")
}).catch(err=>{
    console.log(err)
})

module.exports = {connection}
