require('dotenv').config()
const fs = require('fs')

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI 
  : process.env.MONGODB_URI
const KEY = fs.readFileSync(process.env.KEY_PATH)
const CERT = fs.readFileSync(process.env.CERT_PATH)

module.exports = {
  MONGODB_URI,
  PORT,
  KEY,
  CERT
}