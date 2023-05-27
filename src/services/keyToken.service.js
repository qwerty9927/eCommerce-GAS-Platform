const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
  static async createKeyToken(userId, accessKey, refreshKey){
    const key = keyTokenModel.create({
      userId, 
      accessKey,
      refreshKey
    })
    return !!key 
  }
}

module.exports = KeyTokenService