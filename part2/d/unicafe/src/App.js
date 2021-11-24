import React, { useState } from 'react'

// const Button = () => {
//     return (
//     )
// }
const Stat = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td><td>{value}</td>
        </tr>
    )
}
const Statistics = ({good, neutral, bad, all, avg}) => {
    if (good === 0 && bad === 0 && neutral === 0) {
        return (<p>No Feedback Given</p>)
    }
    return (
           <table>
                <thead>Statistics</thead>
                <tbody>
                    <Stat text='good' value={good}/>
                    <Stat text='neutral' value={neutral}/>
                    <Stat text='bad' value={bad}/>
                    <Stat text='all' value={all}/>
                    <Stat text='average' value={avg/ 3}/>
                    <Stat text='positive' value={(good *  all/100)}/>
                </tbody>
            </table>
    ) 
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const getTotalVotes = () => {
      return good + neutral + bad
  }
  const getAverageVotes = () => {
      const goodRatio = 1 * good;
      const neutralRatio = 0 * neutral;
      const badRatio = -1 * bad;
      return goodRatio + neutralRatio + badRatio;
  }

  return (
    <div>
        <h1>Kindly Give Feedback</h1>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
        <Statistics good={good} neutral={neutral} bad={bad}
                    all={getTotalVotes()} avg={getAverageVotes()}
        />
    </div>
  )
}

export default App