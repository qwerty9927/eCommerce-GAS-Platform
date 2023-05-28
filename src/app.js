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
app.use((req, res, next) => {
  const error = new Error("Not found")
  error.statusCode = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500
  // console.log(error)
  return res.status(statusCode).json({
    status: "Error",
    code: statusCode,
    message: error.message || "Internal Server Error"
  })
})

module.exports = app