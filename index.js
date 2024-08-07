const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const date = new Date()
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')
const persons = require('./models/person')


app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())
//app.use(express.static('build'))

//app.set('json spaces', 2)

let data = [
  {
    "id": 1231,
    "name": "test",
    "number": "not connected to db"
  }
]


app.get('/api/persons/', (req, res) => {
  persons.find({})
    .then(result => {
      res.send(JSON.stringify(result, null, 4))
      data = result
    })
})


app.get("/info/", (req, res) => {
  res.send(`Phonebook has info for ${data.length} people <br>  
      time ${date}`)
})


app.get('/api/persons/:id', (req, res, next) => {

  persons.find({ _id: req.params.id })
    .then(result => {
      res.send(JSON.stringify(result, null, 4))
    })
    .catch(err => next(err))

  
})

app.delete('/api/persons/:id/', (req, res, next) => {
  console.log("req params: ", req.params.id)
  
  //const query = { _id : req.params.id}

  persons.findByIdAndRemove(req.params.id)
    .then(result => {
    if (result !== null)
      res.status(204).end()
    else
      res.status(404).end()
  })
    .catch(err => next(err))

})

app.post("/api/persons/", (req, res) => {

  const Person = new persons({
      name: req.body.name,
      number: req.body.number
  })

  Person.save().then(() => {
      console.log(Person)
      console.log(`added ${Person.name} ${Person.number} to phonebook`) 
      res.send(JSON.stringify(Person, null, 4))
  })

})

app.put('/api/persons/:id', (req, res, next) => {


  persons.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        number: req.body.number,
      },
    },
    {new: true}
  )
  
})
  
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})



