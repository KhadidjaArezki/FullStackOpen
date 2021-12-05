import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Notification from './components/Notification.js'
import './index.css'

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
const Person = ({person, handleDelete}) => {
    return (
        <li key={person.id}>
            {person.name}: {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
    )
}

const People = ({personsToShow, deleteHandler}) => {
    return personsToShow.map(person => <Person person={person} handleDelete={deleteHandler}/>)
}

const App = () => {
    const [persons, setPersons] = useState([]) 

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const [NotificationMessage, setNotificationMessage] = useState(null)
    const [NotificationClass, setNotificationClass] = useState('')

    useEffect(() => {
        personService
            .getPersons()
            .then(persons => setPersons(persons))
    }, [])
    
    const notifyUser = (message, className) => {
        setNewName('')
        setNewNumber('')
        setNotificationMessage(message)
        setNotificationClass(className)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
    }
    const addName = (event) => {
        event.preventDefault()
        // Check if name already exists
        if (persons.some(person => person.name === newName)) {
            const message = `${newName} has ALREADY been added to Phonebook. Do you want to replace the old number with the new one?`
            // Confirm update
            if (window.confirm(message)) {
                const personToUpdate = persons.find(person => person.name === newName)
                const changedPerson = {
                    ...personToUpdate,
                    number: newNumber
                }
                personService
                    .updatePerson(changedPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => 
                            person.id !== updatedPerson.id? person : updatedPerson
                        ))
                        setNewName('')
                        setNewNumber('')
                        const message = `Updated ${updatedPerson.name}`
                        notifyUser(message, 'success')
                    })
                    .catch(error => {
                        console.error(error)
                        personService
                        .getPersons()
                        .then(persons => setPersons(persons))
                        const message = `${changedPerson.name} was already deleted`
                        notifyUser(message, 'error')
                    })
            }
        }
        else {
            const newPerson = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            personService
                .addPerson(newPerson)
                .then(createdPerson => {
                    setPersons(persons.concat(createdPerson))
                    const message = `Added ${createdPerson.name}`
                    notifyUser(message, 'success')
                })
                .catch(error => {
                    console.error(error)
                    const message = `${newPerson.name} cannot be added!`
                    notifyUser(message, 'error')
                })
        }
    }

    const deletePerson = (id) => {
        if (window.confirm('Are you sure you want to delete this perosn?')) {
            const personName = persons.find(person => person.id === id).name
            personService
                .deletePerson(id)
                .then(() => {
                    personService
                        .getPersons()
                        .then(persons => {
                            setPersons(persons)
                            const message = `${personName} successfully deleted`
                            notifyUser(message, 'success')
                        })
                })
                .catch(error => {
                    console.error(error)
                    const message = `${personName} does not exist`
                    notifyUser(message, 'error')
                })
        }
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
        <Notification message={NotificationMessage} messageClass={NotificationClass}/>
        <Filter value={newSearch} handler={handleSearchChange}/>
        <h3>Add New</h3>
        <Form submitHandler={addName} nameValue={newName} nameChangeHandler={handleNameChange} 
            numberValue={newNumber} numberChangeHandler={handleNumberChange}/>
        <h2>Numbers</h2>
        <ul>
            <People personsToShow={showPersons()} deleteHandler={deletePerson}/>
        </ul>
      </div>
    )
  }

export default App