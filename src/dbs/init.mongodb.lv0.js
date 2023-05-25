const mongoose = require("mongoose");

const connectString = "mongodb://127.0.0.1:27017/eCommerce_gas"
mongoose.connect(connectString)
  .then( _ => {
    console.log("Connected to mongodb success!")
  })
  .catch( (err) => {
    console.log("Connect to mongodb failed")
  })

// dev
if(1 === 1){
  mongoose.set("debug", true)
  mongoose.set("debug", { color: true })
}
