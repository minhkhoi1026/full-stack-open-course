const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = !user 
                        ? false
                        : await bcrypt.compare(body.password, user.passwordHash)
  if (!passwordCorrect || !user)
    return response
      .status(401)
      .json({ error: 'invalid username or password'})
  
  const payload = {
    username: user.username,
    id: user._id
  }
  const token = jwt.sign(payload, config.KEY)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter