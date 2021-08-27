const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

server = http.createServer(app)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})