import React from 'react'
import { useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import NotificationContext from '../NotificationContext'
import axios from 'axios'

const baseUrl = 'http://localhost:3011/anecdotes'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
   
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(
    (newAnecdote) => axios.post(baseUrl, newAnecdote).then(res => res.data),
    {
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
        dispatch({
          type: "ADD",
          payload: newAnecdote.content
        })
      },
      onError: (error) => {
        dispatch({
          type: "ERROR",
          payload: error.response.data.error
        })
      }
    }
  )
  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }
  
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
