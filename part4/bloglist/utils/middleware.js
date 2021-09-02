const logger = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')

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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
    request.token = authorization.substring(7)

  next()
}

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, config.KEY)
    if (!decodedToken || !decodedToken.id)
      return response.status(401).json({ error: 'token missing or invalid' })

    request.user = await User.findById(decodedToken.id)
  }
  next()
}

module.exports = {
  errorHandler, tokenExtractor, userExtractor
}