const express = require("express")
const morgan = require("morgan")
const {default: helmet} = require("helmet")
const compression = require("compression")
const app = express()

// middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

// inti db
require("./dbs/init.mongodb")

// router

app.get('/', (req, res, next) => {
  res.status(200).send("Hello")
})

// handing errors

module.exports = app