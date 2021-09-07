import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // get blog after render file
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // one-time log-in
  useEffect(() => {
    const userString = window.localStorage.getItem('loggedUserJSON')

    if (userString) {
      const user = JSON.parse(userString)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // handle logout button
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserJSON')
    setUser(null)
  }
  // handle login button
  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await loginService.login({username, password})
    
    window.localStorage.setItem('loggedUserJSON', JSON.stringify(user))
    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
    setUser(user)
  }
  // handle blog submit button
  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    const resultNote = await blogService.create(newBlog)
    console.log(resultNote)

    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(blogs.concat(resultNote))
  }

  // conditional rendering logged in or not
  if (user === null) 
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
      />
    )

  return (
    <div>
      <h2>blogs</h2>
      
      <BlogForm
        handleBlogSubmit={handleBlogSubmit}
        title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl}
      />

      <div>
        {user.name} logged in 
        <button onClick={handleLogout}>log out</button>
      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App