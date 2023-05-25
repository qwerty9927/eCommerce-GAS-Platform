const mongoose = require("mongoose")
const os = require('os')

const _SECOND = 5000

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    const maxConnection = numCores * 5 // estimate max connection

    console.log(`Active connection::${numConnection}`)
    console.log(`Usage memonry::${memoryUsage / 1024 / 1024} MB`)

    if(numConnection > maxConnection){
      console.log("Connection overload!")
    }
  }, _SECOND)
}

module.exports = {
  checkOverload
}