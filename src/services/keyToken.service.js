const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
  static async createKeyToken(userId, publicKey){
    const key = keyTokenModel.create({
      userId, 
      publicKey
    })
    return !!key 
  }
}

module.exports = KeyTokenService