import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  // Anecdotes are ordered by number of votes descending
  const anecdotes = useSelector(state => 
    state.sort((anecdoteA, anecdoteB) =>  anecdoteB.votes - anecdoteA.votes))

  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
       <Anecdote
        anecdote={anecdote}
        handleVote={vote}
       /> 
      )}
    </>
  )
}

export default Anecdotes