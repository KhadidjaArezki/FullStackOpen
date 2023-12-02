import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from 'react-redux'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
}


  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            type='text'
            name='anecdote'
          />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default NewAnecdote