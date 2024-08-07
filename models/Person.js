const mongoose = require("mongoose")
require('dotenv').config()
const Schema = mongoose.Schema

const url = process.env.MONGO_URI

const UserSchema = new Schema({
  name: String,
  number: String,
})

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected '))
  .catch(err => console.log(err))


UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
  }
})



module.exports = mongoose.model('Person', UserSchema)
