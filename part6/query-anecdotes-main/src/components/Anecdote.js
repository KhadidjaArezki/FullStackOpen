import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const baseUrl = 'http://localhost:3011/anecdotes'

const Anecdote = ({ anecdote }) => {

  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation(
    (updatedAnecdote) => axios.put(baseUrl, updatedAnecdote).then(res => res.data),
    {
      onSuccess: (updatedAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
          .map(anecdote => {
            if (anecdote.id !== updatedAnecdote.id) return anecdote
            else return updatedAnecdote
          })
        
        queryClient.setQueryData('anecdotes', anecdotes)
      }
    }
  )

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }
    console.log(anecdote)
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

export default Anecdote

