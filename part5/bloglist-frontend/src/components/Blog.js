import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, upvoteBlog, removeBlog, user }) => {
  const [showFull, setShowFull] = useState(false)
  // css for blog view
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButton = <button onClick={() => removeBlog(blog)}>remove blog</button>

  const hiddenInfo = () => {
    return (
      <>
        URL: {blog.url} <br/>
        Likes: {blog.likes}
        <button onClick={() => upvoteBlog(blog)}>like</button> <br/>
        Blog creator: {blog.user && blog.user.name} <br/>
        {blog.user.username === user.username && deleteButton}
      </>
    )
  }
  // additional action for toggle visibility
  const handleToggleVisible = () => {
    setShowFull(!showFull)
  }

  return (
    <div style = {blogStyle} className='blogDiv'>
        Title: {blog.title} <br/>
        Author: {blog.author} <br/>
      {showFull && hiddenInfo()}
      <Togglable
        buttonLabel="view"
        customToggleVisible={handleToggleVisible}>
      </Togglable>
    </div>
  )
}

export default Blog