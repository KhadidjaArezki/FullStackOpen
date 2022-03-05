import NewAnecdote from "./components/NewAnecdote";
import Anecdotes from "./components/Anecdotes";

const App = () => { 

  return (
    <div>
      <h2>Anecdotes</h2>
      <NewAnecdote/> 
      <Anecdotes/>
    </div>
  )
}

export default App