const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
// morgan logger
const logger = morgan('tiny')
app.use(logger)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// route for default page
app.get('/', (request, response) => {
    response.send(`<h1>Hello, I'm Minh Khoi Nguyen Nhat!</h1>`)
})

// route for persons request
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

// route for info request
app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
    `<p>Phonebook has info for ${persons.length} people. </p>
    <p>${date}</p>`)
})

// route for single person request
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => (person.id === id))
  if (person)
    response.json(person)
  else 
    response.status(404).end()
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

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})