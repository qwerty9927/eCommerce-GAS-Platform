const bcrypt = require('bcrypt')
const crypto = require("crypto")
const shopModel = require("../models/shop.model")
const KeyTokenService = require('./keyToken.service')
const createTokenPair = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { ConflictRequestError } = require('../core/error.response')

const RoleShop = {
  SHOP: "S01",
  WRITER: "W01",
  EDITER: "E01",
  ADMIN: "A01"
}
class AccessService {
  static async signUp({name, email, password}){
    const holderShop = await shopModel.findOne({ email }).lean()
    if(holderShop){
      throw new ConflictRequestError()
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newShop = await shopModel.create({
      name, email, password: passwordHash, roles: [RoleShop.SHOP] 
    })
    if(newShop) {
      const accessKey = crypto.randomBytes(64).toString("hex")
      const refreshKey = crypto.randomBytes(64).toString("hex")

      const isKeyTokenSuccess = await KeyTokenService.createKeyToken(newShop._id, accessKey, refreshKey)
      if(!isKeyTokenSuccess){
        throw new Error()
      }
      const tokens = createTokenPair({ name, email }, accessKey, refreshKey)
      return {
        code: 201,
        message: "User create success",
        metadata: {
          shop: getInfoData(newShop, ["_id", "name", "email"]),
          tokens
        }
      }
    }
    throw new Error()
  }
}

module.exports = AccessService