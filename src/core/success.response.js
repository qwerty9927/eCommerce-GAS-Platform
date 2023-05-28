
const STATUS_CODE = {
  OK: 200,
  CREATED: 201
}

const REASON_STATUS_CODE = {
  OK: "Success",
  CREATED: "Created"
}

class SuccessResponse {
  constructor({ message, statusCode, metaData }) {
    this.status = "Success"
    this.message = message
    this.code = statusCode
    this.metaData = metaData
  }

  send({res, header = {}}) {
    return res.status(this.code).json(this)
  }
}

class Ok extends SuccessResponse {
  constructor({ message = REASON_STATUS_CODE.OK, statusCode = STATUS_CODE.OK, metaData = {} }) {
    super({ message, statusCode, metaData })
  }
}

class Created extends SuccessResponse {
  constructor({ message = REASON_STATUS_CODE.CREATED, statusCode = STATUS_CODE.CREATED, metaData = {} }) {
    super({ message, statusCode, metaData })
  }
}

module.exports = {
  Ok,
  Created
}





