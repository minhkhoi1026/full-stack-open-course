import React, { useState } from 'react'

const VoteButton = ({onClick, text}) => {
  return (
  <button onClick={onClick}>
    {text}
  </button>
  )
}

const Summary = ({name, val}) => (<p>{name}: {val}</p>)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const voteGood = () => setGood(good + 1);
  const voteNeutral = () => setNeutral(neutral + 1);
  const voteBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>Give feedback</h1>
      <VoteButton onClick = {voteGood} text="good"/>
      <VoteButton onClick = {voteNeutral} text="neutral"/>
      <VoteButton onClick = {voteBad} text="bad"/>
      <h1>Statistics</h1>
      <Summary name="good" val={good}/>
      <Summary name="neutral" val={neutral}/>
      <Summary name="bad" val={bad}/>
    </div>
  )
}

export default App