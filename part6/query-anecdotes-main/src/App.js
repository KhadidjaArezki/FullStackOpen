import React from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import { NotificationContextProvider } from './NotificationContext'
import axios from 'axios'

const baseUrl = 'http://localhost:3011/anecdotes'

const App = () => {

  const result = useQuery(
    'anecdotes',
    () => axios.get(baseUrl).then(res => res.data),
    {
      refetchOnWindowFocus: false,
      retry: false
    })
    
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  
  if ( result.isError ) {
    return <div>Server Error. Anecdotes temporarily unavailable</div>
  }
  
  const anecdotes = result.data

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote} />
        )}
      </div>
    </NotificationContextProvider>
  )
}

export default App
