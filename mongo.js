const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}


//const url = `mongodb+srv://safari:${pass}@fsopen.khinnaw.
//    mongodb.net/?retryWrites=true&w=majority`
const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const persons = mongoose.model('persons', personSchema)



if (process.argv.length == 5) {
  console.log(`${process.argv.length} yay`)

  const name = process.argv[3]
  const number = process.argv[4]

  const Person = new persons ({
    name: name,
    number: number
  })

  Person.save().then(() => {
    console.log(`added ${name} ${number} to phonebook`) 
    mongoose.connection.close()
  })
}



if (process.argv.length == 3) {

  const pass = process.argv[3]

  if (pass === process.env.MONGO_PASS) {
    console.log('Invalid password')
    process.exit(1)
  }
  else {
    persons.find({})
      .then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(`${ person.name } ${ person.number }`)
        })
        mongoose.connection.close()
      })
  }
}




