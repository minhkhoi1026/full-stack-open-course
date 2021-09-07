import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

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

  // function for popup notification for 5s
  const popupNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification(null)
    }, 5000);
  }
  // handle logout button
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserJSON')
    setUser(null)
    popupNotification({content: "Logged out successful", type: "notif"})
  }
  // handle login button
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedUserJSON', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
      popupNotification({content: "Logged in successful", type: "notif"})
    }
    catch (exception) {
      console.log(exception)
      popupNotification({content: "Wrong username or password", type: "error"})
    }
    
  }

  const createBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisible()
      const resultBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(resultBlog))
      popupNotification({
        content: `Added blog: "${resultBlog.title}" of ${resultBlog.author}`, 
        type: "notif"
      })
    }
    catch (exception) {
      popupNotification({content: `${exception.response.data.error}`,  type: "error"})
    }
  }

  // conditional rendering logged in or not
  if (user === null)
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
        />
      </div>
    )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification}/>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog}/>
      </Togglable>

      <div className="info-user">
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