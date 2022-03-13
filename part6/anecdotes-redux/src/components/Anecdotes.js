import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

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

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    const anecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification({
      message: `You upvoted ${anecdote.content}`,
      type: 'success'
    }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
       <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={vote}
       /> 
      )}
    </>
  )
}

export default Anecdotes