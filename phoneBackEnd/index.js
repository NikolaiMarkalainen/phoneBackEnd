const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
var morgan = require('morgan')
app.use(morgan('tiny'))
app.use(cors())
const http = require("https://wispy-haze-4584.fly.dev/wispy-haze-4584/")
let people = [
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

app.get('/',(request, response) => {
    response.send('<h1>Hello World </h1>')
})

app.get('/api/people', (request,response) => {
    response.json(people)
})

app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = people.find(person => person.id === id)
    if(person){
    response.json(person)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    people = people.filter(person => person.id !== id)
    response.status(204).end()
})
app.get('/info', (request,response) => {
    response.send(`<p>Phonebook has info for ${people.length} people</p> ${Date()}`)
})

const generateId = (max) => {
    return Math.floor(Math.random()* max)
}

app.post('/api/people', (request, response) => {
    const body = request.body
    nameFind = people.find(person => person.name.toLowerCase() === body.name.toLowerCase())
    numberFind = people.find(person => person.number.toLowerCase() === body.number.toLowerCase())

    if(nameFind){
        return response.status(400).json({
            error: 'Name exsists'
        })
    }
    if(numberFind){
        return response.status(400).json({
            error: 'Number exsists'
        })
    }
    const person = {
        id: generateId(100000),
        name: body.name,
        number: body.number
    } 
    people = people.concat(person)
    response.json(person)
    morgan.token("data", (req) => JSON.stringify(req.body))
})
const PORT  = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) 
