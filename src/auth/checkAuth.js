
const { ForbiddenRequestError } = require("../core/error.response")
const { findById } = require("../services/apikey.service")

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization"
}
const apiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]
  if (!key) {
    return next(new ForbiddenRequestError())
  }

  const objKey = await findById(key)
  if (!objKey) {
    return next(new ForbiddenRequestError())

  }
  req.objKey = objKey
  console.log(objKey)
  return next()
}

const permission = (permission) => {
  return (req, res, next) => {
    console.log(req.objKey.permissions)
    if (!req.objKey.permissions) {
      return next(new ForbiddenRequestError())
    }

    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission) {
      return next(new ForbiddenRequestError())
    }
    return next()
  }
}

module.exports = {
  apiKey,
  permission
}