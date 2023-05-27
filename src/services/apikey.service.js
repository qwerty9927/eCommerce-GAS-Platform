const apikeyModel = require("../models/apikey.model")


const findById = async (key) => {
  // const newApiKey = await apikeyModel.create({
  //   key: "123",
  //   permissions: ["0000"]
  // })
  // console.log(newApiKey)
  const result = await apikeyModel.findOne({ key }).lean()
  return result
}

module.exports = {
  findById
}