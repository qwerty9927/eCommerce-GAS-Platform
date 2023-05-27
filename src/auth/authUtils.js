const jwt = require('jsonwebtoken')

function createTokenPair(payload, accessKey, refreshKey){
  try {
    const accessToken = jwt.sign(payload, accessKey, {
      expiresIn: '2 days'
    })

    const refreshToken = jwt.sign(payload, refreshKey, {
      expiresIn: "7 days"
    })

    return { accessToken, refreshToken }
  } catch(error) {

  }
}

module.exports = createTokenPair