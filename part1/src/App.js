import React from 'react'

const Header = (prop) => (<h1>{prop.course}</h1>)

const Part = (prop) => (
  <p>
      {prop.part} {prop.exercises}
  </p>
)

const Content = (prop) => {
  console.log(prop)
  return (
  <div>
    <Part part={prop.parts[0].name} exercises={prop.parts[0].exercises}/>
    <Part part={prop.parts[1].name} exercises={prop.parts[1].exercises}/>
    <Part part={prop.parts[2].name} exercises={prop.parts[2].exercises}/>
  </div>
  )
}

const Total = (prop) => {
  return (
  <>
    <p>Number of exercises {prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises}</p>
  </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App