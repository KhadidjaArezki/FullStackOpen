import React, { useState } from 'react'

const Featured = ({text, numVotes}) => {
    return (
        <div>
            <h2>Anecdote with Most Votes</h2>
            <p>{text}</p>
            <p>has {numVotes} votes</p>
        </div>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const getRandomAnecdote = () => {
      const randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length);
      return randomAnecdoteIndex
  }
  const getNewVotes = (voteIndex) => {
      const newVotes = [...votes];
      newVotes[voteIndex]+=1;
      return newVotes
  }
  const bestQuoteIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => setVotes(getNewVotes(selected))}>vote</button>
      <button onClick={() => setSelected(getRandomAnecdote())}>next anecdote</button>
      <Featured text={anecdotes[bestQuoteIndex]} numVotes={votes[bestQuoteIndex]}/>
    </div>
  )
}

export default App