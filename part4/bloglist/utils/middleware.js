const logger = require('./logger')

const errorHandler = (err, req, res, next) => {
  logger.error(err)

  if (err.name === 'ValidationError')
    res.status(400).json({ error: err.message })
  else if (err.name === 'CastError')
    res.status(400).json({ error: err.message })
  else if (err.name === 'JsonWebTokenError')
    res.status(401).json({ error: 'invalid token'})

  next(err)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    req.token = authorization.substring(7)

  next()
}

module.exports = {
  errorHandler, tokenExtractor
}