const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const SALT_ROUND = 10
  if (!body.password)
    throw {name: "EncryptError", message: "Missing password when encrypt"}
  const passwordHash = await bcrypt.hash(body.password, SALT_ROUND)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const resultUser = await newUser.save()
  
  response.json(resultUser)
})

module.exports = usersRouter