import React from 'react'

const LoginForm = (props) => {
  const { handleLogin, username, setUsername, password, setPassword } = { ...props }

  return (
    <div>
      <form onSubmit={handleLogin} id='login-form'>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username" id="username"
            onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password" id="password"
            onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type="submit" id='login-button'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm