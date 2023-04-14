// React Query is a server-state library, responsible for
// managing asynchronous operations between your server and client.
// It acts as a cache for what is stored on the server.
// It makes fetching, caching, synchronizing and updating server-state in your React application a breeze.

import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getNotes, createNote, updateNote } from './requests'
import './index.css'

const App = () => {
  const queryClient = useQueryClient()
  const newNoteMutation = useMutation(
    createNote,
    // Tell React Query that the old result of the query
    // whose key is the string notes should be invalidated
    //{
      //onSuccess: () => queryClient.invalidateQueries('notes')
    //}
    // read the existing notes state of the query and updates it by adding a new note
    {
      onSuccess: (newNote) => {
        const notes = queryClient.getQueryData('notes')
        queryClient.setQueryData('notes', notes.concat(newNote))
      }
    }
  )
  
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({ content, important: true })
  }
  
  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    },
  })

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }
  
  // We are using axios to get the data as usual, but now, the
  // call is wrapped in a query formed with the useQuery function
  // Server data is retrieved and rendered on the screen without
  // using the React hooks useState and useEffect 
  const result = useQuery(
    'notes', // unique key used for refetching, caching, and sharing your queries throughout your application
    getNotes, {
    refetchOnWindowFocus: false
  })
  
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App

