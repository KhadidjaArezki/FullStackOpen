import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import NewAnecdote from "./components/NewAnecdote";
import Anecdotes from "./components/Anecdotes";
import Notification from './components/Notification'
import Filter from "./components/Filter";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  },[dispatch])  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <NewAnecdote/> 
      <Anecdotes/>
    </div>
  )
}

export default App