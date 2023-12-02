import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} votes
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  // Anecdotes are ordered by number of votes descending
  const anecdotes = useSelector(({ anecdotes, filter }) => 
    anecdotes
      .slice()
      .sort((anecdoteA, anecdoteB) =>
        anecdoteB.votes - anecdoteA.votes
      )
      .filter(anecdote => 
        anecdote.content.includes(filter)
      )
  )

  console.log(anecdotes);
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    // const id = anecdote.id
    // const anecdoteToUpdate = anecdotes.find(anecdote => anecdote.id === id)
    const anecdoteToUpdate = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    dispatch(updateAnecdote(anecdoteToUpdate))
    dispatch(setNotification({
      message: `You upvoted ${anecdote.content}`,
      type: 'success'
    }, 5)) 
  }

  return (
    <>
      {anecdotes.map(anecdote =>
       <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={handleVote}
       /> 
      )}
    </>
  )
}

export default Anecdotes