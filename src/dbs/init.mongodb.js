const mongoose = require("mongoose")
const { checkOverload } = require("../helpers/check.connect")

class Database {

// use strategy pattern
  constructor(type){
    this.connect(type)
  }

  mongodbConnect(){
    const connectString = "mongodb://127.0.0.1:27017/eCommerce_gas"
    mongoose.connect(connectString)
      .then( _ => {
        console.log("Connected to mongodb success!")
        checkOverload()
      })
      .catch( (err) => {
        console.log("Connect to mongodb failed")
      })

    // dev
    if(1 === 1){
      mongoose.set("debug", true)
      mongoose.set("debug", { color: true })
    }

  }

  connect(type) {
    return {
      mongodb: this.mongodbConnect
    }[type]()
  }

  static getInstance(type){
    if(!Database.instance){
      Database.instance = new Database(type)
    }
    return Database.instance 
  }
}

const instance = Database.getInstance("mongodb")

module.exports = instance