const logger = require('./logger')

const errorHandler = (err, req, res, next) => {
  logger.error(err)

  if (err.name === 'ValidationError')
    res.status(400).json({ error: err.message })
  else if (err.name === 'CastError')
    res.status(400).json({ error: err.message })
  else if (err.name === 'EncryptError')
    res.status(400).json({ error: err.message })

  next(err)
}

module.exports = {
  errorHandler
}