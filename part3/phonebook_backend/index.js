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
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then (
    result => {
      if (result)
        response.json(result)
      else 
        response.status(404).end()
    })
})

// route for delete a single person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = (range) => {
  return Math.floor(Math.random() * range)
}

// route for add new person into persons
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  // handle content missing
  if ( !body || ['name', 'number'].some( prop => !(prop in body) ) )
    return response.status(400).json({error: 'content missing'})
  // handle name duplicate
  if ( persons.find( person => (person.name === body.name) ) )
    return response.status(400).json({error: 'name already exist on phone book'})

  const newPerson = {...body, id: generateId(1e5)}
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})