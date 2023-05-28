const { Created } = require('../core/success.response')
const AccessService = require('../services/access.service')

class AccessController {
  async signUp(req, res, next) {
    try {
      new Created({
        message: "User created success",
        metaData: await AccessService.signUp(req.body)
      }).send({ res })
    } catch(error) {
      next(error)
    }
  }
}

module.exports = new AccessController()