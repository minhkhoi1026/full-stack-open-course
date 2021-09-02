const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

// connect to server
logger.info(`connecting to`, config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(() => logger.info("connected to server!"))
.catch(error => logger.error("connect failed, error info: ", error))

// use middleware and router
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app