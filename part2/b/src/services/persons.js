import axios from 'axios'
//'https://phonebook-backend-exercises.herokuapp.com/api/persons' 

const baseUrl = '/api/persons' 
const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const updatePerson = (updatedPerson) => {
  const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
  return request.then(response => response.data)
}
export default {getPersons, addPerson, deletePerson, updatePerson}