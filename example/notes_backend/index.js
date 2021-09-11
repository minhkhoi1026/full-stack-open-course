const app = require('./app') // the actual Express application
const https = require('https')
const config = require('./utils/config')
const logger = require('./utils/logger')

const options = {
  key: config.KEY,
  cert:config.CERT
}

const server = https.createServer(options, app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})