const bcrypt = require('bcrypt')
const crypto = require("crypto")
const shopModel = require("../models/shop.model")
const KeyTokenService = require('./keyToken.service')
const createTokenPair = require('../auth/authUtils')

const RoleShop = {
  SHOP: "S01",
  WRITER: "W01",
  EDITER: "E01",
  ADMIN: "A01"
}
class AccessService {
  static async signUp({name, email, password}){
    try {
      const holderShop = await shopModel.findOne({ email }).lean()
      if(holderShop){
        return {
          code: 409,
          message: "User existed"
        }
      }
      const passwordHash = await bcrypt.hash(password, 10)
      const newShop = await shopModel.create({
        name, email, password: passwordHash, roles: [RoleShop.SHOP] 
      })
      if(newShop) {
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem"
          },
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem"
          }
        })

        const isKeyTokenSuccess = await KeyTokenService.createKeyToken(newShop._id, publicKey)
        if(!isKeyTokenSuccess){
          return {
            code: 400,
            message: "Key error create"
          }
        }
        const tokens = createTokenPair({ name, email }, privateKey)
        return {
          code: 201,
          message: "User create success",
          metadata: {
            shop: newShop,
            tokens
          }
        }
      }
      return {
        "code": 400,
        "message": "User error create"
      }
    } catch(error){
      return {
        code: 500,
        message: error.message,
        status: 'error'
      }
    }
  }
}

module.exports = AccessService