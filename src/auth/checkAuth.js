
const { findById } = require("../services/apikey.service")

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization"
}
const apiKey = async (req, res, next) => {
  const key = req.headers[HEADER.API_KEY]
  if (!key) {
    return res.status(403).json({
      message: "Forbidden error"
    })
  }

  const objKey = await findById(key)
  if (!objKey) {
    return res.status(403).json({
      message: "Forbidden error"
    })
  }
  req.objKey = objKey
  console.log(objKey)
  return next()
}

const permission = (permission) => {
  return (req, res, next) => {
    console.log(req.objKey.permissions)
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: "Forbidden error"
      })
    }

    const validPermission = req.objKey.permissions.includes(permission)
    if (!validPermission) {
      return res.status(403).json({
        message: "Forbidden error"
      })
    }
    return next()
  }
}

const asyncHandler = fn => {
  return (req, res, next) => { 
    fn(req, res, next).catch(next)
  }
}

module.exports = {
  apiKey,
  permission,
  asyncHandler
}