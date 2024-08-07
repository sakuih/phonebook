const mongoose = require('mongoose')
require('dotenv').config()

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const pass = process.env.MONGO_PASS

const url = process.env.MONGO_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then( result => {
  console.log("Connected to MongoDB")
})
.catch((e) => {
  console.log("Error connecting to MongoDB", e.message)
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('persons', personSchema)
