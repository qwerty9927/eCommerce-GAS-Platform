const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "key"
const COLLECTION_NAME = "Keys"

const keyTokenSchema = new Schema({
  userId: {
    type: ObjectId,
    require: true,
    ref: "Shop"
  },
  publicKey: {
    type: String,
    require: true
  },
  refreshToken: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

module.exports = model(DOCUMENT_NAME, keyTokenSchema)