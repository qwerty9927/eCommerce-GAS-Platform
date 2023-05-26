const jwt = require('jsonwebtoken')

function createTokenPair(payload, privateKey){
  try {
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: '2 days'
    })

    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days"
    })

    return { accessToken, refreshToken }
  } catch(error) {

  }
}

module.exports = createTokenPair