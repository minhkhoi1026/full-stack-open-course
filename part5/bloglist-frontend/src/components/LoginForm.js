import React from 'react'

const LoginForm = (props) => {
  const {handleLogin, username, setUsername, password, setPassword} = {...props}

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm