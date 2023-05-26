require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const {default: helmet} = require("helmet")
const compression = require("compression")
const app = express()

// middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// inti db
require("./dbs/init.mongodb")

// router
app.get('/', (req, res, next) => {
  res.status(200).send("Hello")
})

app.use(require("./routes"))

// handing errors

module.exports = app