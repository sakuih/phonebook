const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const date = new Date()
const app = express()
const PORT = process.env.PORT || 3001
const cors = require('cors')
const bodyParser = require('body-parser')
const persons = require('./models/person')

 
app.use(express.json())


morgan.token('body', req => {
  return JSON.stringify(req.body)
})


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('build'))


let data = [
  {
    'id': 1231,
    'name': 'test',
    'number': 'not connected to db'
  }
]


app.get('/api/persons/', (req, res, err) => {
  persons.find({})
    .then(result => {
      res.send(JSON.stringify(result, null, 4))
      data = result
    })
    .catch(err => next(err))
})


app.get('/info/', (req, res) => {
  persons.countDocuments()
    .then(result => {
      res.send(`Phonebook has info for ${result} people <br>  
        time ${date}`)
    })
    .catch(err => next(err))
})


app.get('/api/persons/:id', (req, res, next) => {

  persons.find({ _id: req.params.id })
    .then(result => {
      res.send(JSON.stringify(result, null, 4))
    })
    .catch(err => next(err))

  
})

app.delete('/api/persons/:id/', (req, res, next) => {
  console.log('req params: ', req.params.id)
  
  //const query = { _id : req.params.id}

  persons.findByIdAndRemove(req.params.id)
    .then(result => {
      res.send('Success')
      //next(err)
    })
    .catch(err => next(err))

})

app.post('/api/persons/', (req, res, next) => {

  const Person = new persons({
    name: req.body.name,
    number: req.body.number
  })

  Person.save().then(() => {
    //console.log(Person)
    //console.log(`added ${Person.name} ${Person.number} to phonebook`) 
    res.send(JSON.stringify(Person, null, 4))
  }).catch(err => next(err))

})

app.put('/api/persons/:id', (req, res, next) => {


  res.set('Content-type', 'application/json')
  persons.findByIdAndUpdate(req.params.id, req.body)
    .then(result => res.json({msg: req.body }))
    .catch(err => next(err)
    )
  /*
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
  */
  
})

app.get('/api/persons/errorTest', (req, res, next) => {
  let error = new Error('Error test')
  error.status = 200
  next(error)
})

function errorHandler(err, req, res, next) {
  //console
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    status: err.status,
  })
}

app.use(errorHandler)
  
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})



