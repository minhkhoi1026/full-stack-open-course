require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

//front end
app.use(express.static('build'))
// cross origin resource allow middleware
app.use(cors())
// json parser middleware
app.use(express.json())

// morgan logger
const logger = morgan(function (tokens, req, res) {
  let message = [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')

  // if method is POST then append json string of body object
  if (req.method === 'POST')
    message = [message, JSON.stringify(req.body)].join(' ')

  return message
})
app.use(logger)

const Person = require('./models/mongo_database')

// route for persons request
app.get('/api/persons', (request, response) => {
  Person.find({}).then( persons => response.json(persons) )
})

// route for info request
app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({})
  .then( 
    result => response.send( `<p>Phonebook has info for ${result.length} people.</p> <p>${date}</p>`))
})

// route for single person request
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then (
    result => {
      if (result)
        response.json(result)
      else 
        response.status(404).end()
    })
    .catch(error => next(error))
})

// route for delete a single person
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => response.status(204).end())
  .catch(error => next(error))
})

// route for add new person into persons
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  
  const newPerson = new Person(body)
  newPerson.save()
  .then(savedPerson => response.json(savedPerson.toJSON()))
  .catch(error => next(error))
})

// route for change content of person
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => response.json(updatedPerson))
  .catch(error => next(error))
})

// error handler for bad request
const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError') 
    response.status(400).json({ error: 'malformatted id'})
  else if (error.name === 'ValidationError')
    response.status(400).json({ error: error.message })
  next(error) 
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})