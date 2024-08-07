import axios from 'axios'
const serverUrl = 'http://localhost:3001/api/persons/'

export function getData() {
    console.log("getData")
    return axios.get(serverUrl).then(response => response.data)
}
export function postData (newPerson) {
    axios.post(serverUrl, {
        name: newPerson.name,
        number: newPerson.number
    })
}

export function updateData(person) {
    console.log("updateData")
    axios.put(`${serverUrl}${person._id}`, {
        name: person.name,
        number: person.number
    })
}

export function deleteData (id) {
    console.log("deleteData", id)
    console.log("deleteData type", typeof(id))
    console.log(`${serverUrl}${id}`)
    axios.delete(`${serverUrl}${id}`)
      .then(() => {
          console.log("DSADSADAS")
      })
      .catch(() => {
            console.log("pooioiio")
      })
}

