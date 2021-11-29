import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value, handler}) => {
    return (
        <div>
            filter shown with: <input value={value} onChange={handler}/>
        </div>
    )
}
const Form = ({submitHandler, nameValue, nameChangeHandler, numberValue, numberChangeHandler}) => {
    return(
        <form onSubmit={submitHandler}>
          <div>
            name: <input value={nameValue} onChange={nameChangeHandler}/>
          </div>
          <div>
            number: <input value={numberValue} onChange={numberChangeHandler}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}
const People = ({personsToShow}) => {
    return personsToShow.map(person => <li key={person.id}>{person.name}: {person.number}</li>)
}

const App = () => {
    const [persons, setPersons] = useState([]) 

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => setPersons(response.data))
    }, [])
    
    const addName = (event) => {
        event.preventDefault()
        if (persons.some(person => person.name === newName)) {
            alert(`${newName} has ALREADY been added to Phonebook`)
        }
        else {
            const newPerson = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(newPerson))
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }
    const showPersons = () => {
        if (newSearch === '') {
            return persons;
        }
        else {
            return persons.filter(person => 
                person.name.toLowerCase().includes(newSearch.toLowerCase()))
        }
    }

    return (
      <div>
        <h2>Phonebook</h2>
        <Filter value={newSearch} handler={handleSearchChange}/>
        <h3>Add New</h3>
        <Form submitHandler={addName} nameValue={newName} nameChangeHandler={handleNameChange} 
            numberValue={newNumber} numberChangeHandler={handleNumberChange}/>
        <h2>Numbers</h2>
        <ul>
            <People personsToShow={showPersons()}/>
        </ul>
      </div>
    )
  }

export default App