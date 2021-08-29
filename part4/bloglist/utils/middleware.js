const logger = require('./logger')

const errorHandler = (err, req, res, next) => {
  logger.error(err)

  if (err.name === 'ValidationError')
    res.status(400).end()
  else if (err.name === 'CastError')
    res.status(400).end()

  next(err)
}

module.exports = {
  errorHandler
}