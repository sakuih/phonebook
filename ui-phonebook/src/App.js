import { useState, useEffect } from 'react'
import Filter from './Filter.js'
import InputForm from './InputForm.js'
import Numbers from './Numbers.js'
import Notification from './Notification.js'
import { getData, postData, updateData, deleteData} from './serverFunc.js'

const cors = require('cors')
// Component imports

const App = () => {
  const [ persons, setPersons] = useState([
    {id: 0, name: 'not connected to db' , number: '3213213'},
    {id: 1, name: 'not connected db' , number: '213'},
    {id: 2, name: 'Arto Hellas' , number: '050505050'}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  // Used in filter
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  // Success message
  const [successMsg, setSuccessMsg] = useState(null)


useEffect( () => {
        getData().then(response => {
          setPersons(response)
          console.log("useEffect")
        })
}, [] )


  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

  function handleFilterChange(e) {

      if (e.target.value.length > 0) {
          setShowAll(false)
          console.log("setShowAll false", e.target.value)
      }
      else {
          setShowAll(true)
          console.log("setShowAll true", e.target.value)
      }
      console.log("handleFilterChange")
      setNewFilter(e.target.value)
  }

  function deletePerson(event) {
     console.log("1person will be deleted", event.id)
      if (window.confirm(`DELETE ${event.name}?`)){
        deleteData(event.id)
      }
  }

  function successMsgfunction () {
    setSuccessMsg(`Added ${newName}`)
      setTimeout(() => {
          setSuccessMsg(null)
      }, 5000)
  }

  function createPerson(e) {
    console.log("Person created")
      e.preventDefault()
      console.log(e)
      console.log(e.target[0].value)
      console.log(e.target[1].value)
      const newPerson = {
        //id: persons.length + 1,
        name: newName,
        number: newNumber,
      }
      const duplicateCheck = persons.some((person) => person.name === newName)

      if(duplicateCheck === false) {
        postData(newPerson)
        //window.location.reload()
        setPersons(persons.concat(newPerson))
        successMsgfunction()

        setNewName('')
        setNewNumber('')
      }
      if(duplicateCheck === true) {
          alert(`${newName} is already on the list`)
          setNewName('')
          setNewNumber('')
      }
     console.log(duplicateCheck) 
        
  }

  function mapPersons(persons) {
    if (showAll === false) {
      let filteredList = []

      console.log("persons", persons)
      filteredList = persons.filter(person => 
        person.name.toLowerCase().includes(newFilter.toLowerCase()))


      return filteredList.map((person) =>
        <li key={person.id}>{person.name} {person.number} 
        <button onClick={() => deletePerson(person)} >
        Delete
        </button></li>)
      }
    else {
      return persons.map((person) =>
          <li key={person.id}> {person.name} {person.number} 
          <button onClick={() => deletePerson(person)} >
          Delete
          </button></li>)
    }
  }

        return (
            <div>
              
              <h2>Phonebook</h2>
                <Notification message={successMsg}  />
                <Filter handleFilter={handleFilterChange} />
                <InputForm 
                  createPerson={createPerson}
                  newName={newName}
                  newNumber={newNumber}
                  handleNameChange={handleNameChange}
                  handleNumberChange={handleNumberChange}
                />
                <Numbers persons={persons} mapPersons={mapPersons} />
            </div>
        )
      }

export default App;
