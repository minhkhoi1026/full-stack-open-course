import React, { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({blog}) => {
  const [showFull, setShowFull] = useState(false)
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hiddenInfo = () => {
    return (
      <>
        URL: {blog.url} <br/>
        Likes: {blog.likes} <button>like</button> <br/>
        Blog creator: {blog.user && blog.user.name} <br/>
      </>
    )
  }
  // additional action for toggle visibility
  const handleToggleVisible = () => {
    setShowFull(!showFull)
  }

  return (
    <div style = {blogStyle}>
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