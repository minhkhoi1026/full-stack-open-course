const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User
        .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3)
    response.status(400).json({ error: 'invalid password' })

  const SALT_ROUND = 10
  const passwordHash = await bcrypt.hash(body.password, SALT_ROUND)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    notes: []
  })

  const resultUser = await newUser.save()
  
  response.json(resultUser)
})

module.exports = usersRouter