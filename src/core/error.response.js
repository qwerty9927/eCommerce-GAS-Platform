
const STATUS_CODE = {
  FORBIDDEN: "403",
  CONFLICT: "409"
}

const REASON_STATUS_CODE = {
  FORBIDDEN: "Forbidden error",
  CONFLICT: "Conflict error"
}

class ErrorResponse extends Error {
  constructor(message, statusCode){
    super(message)
    this.statusCode = statusCode
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = REASON_STATUS_CODE.CONFLICT, statusCode = STATUS_CODE.CONFLICT){
    super(message, statusCode)
  }
}

class ForbiddenRequestError extends ErrorResponse {
  constructor(message = REASON_STATUS_CODE.FORBIDDEN, statusCode = STATUS_CODE.FORBIDDEN){
    super(message, statusCode)
  }
}

module.exports = {
  ConflictRequestError,
  ForbiddenRequestError
}