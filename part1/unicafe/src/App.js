import React, { useState } from 'react'

const VoteButton = ({onClick, text}) => {
  return (
  <button onClick={onClick}>
    {text}
  </button>
  )
};

const StatisticLine = ({text, val}) => {
  return (
  <tr>
    <th>{text}</th>
    <td>{val}</td>
  </tr>
  );
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  // if not have any feedback yet then display this message
  if (good === 0 && neutral === 0 && bad ===0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  const numFeedback = () => (good + neutral + bad);
  const avgScore = () => ((good - bad)/numFeedback());
  const positiveRate = () => (100 * good/numFeedback() + '%');

  return (
  <div>
    <h1>Statistics</h1>
    <table>
      <StatisticLine text="good" val={good}/>
      <StatisticLine text="neutral" val={neutral}/>
      <StatisticLine text="bad" val={bad}/>
      <StatisticLine text ="all" val={numFeedback()}/>
      <StatisticLine text ="average" val={avgScore()}/>
      <StatisticLine text ="positive" val={positiveRate()}/>
    </table>
    
  </div>
  );
};

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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App