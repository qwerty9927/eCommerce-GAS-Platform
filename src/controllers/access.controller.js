const AccessService = require('../services/access.service')

class AccessController {
  async signUp(req, res, next) {
    try {
      const serviceRes = await AccessService.signUp(req.body)
      res.status(serviceRes.code).json(serviceRes)
      } catch(error) {
      next(error)
    }
  }
}

module.exports = new AccessController()