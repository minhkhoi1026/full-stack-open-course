import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // handle blog submit button
  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog(newBlog)
  }

  return (
    <form onSubmit={handleBlogSubmit} id='blog-form'>
      <div>
          title:
        <input
          type="text" name="Title" value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          author:
        <input
          type="text" name="Author" value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          url:
        <input
          type="text" name="Url" value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create blog</button>
    </form>
  )
}

export default BlogForm