import React from 'react'

const BlogForm = (props) => {
  const {title, setTitle, author, setAuthor, url, setUrl, handleBlogSubmit} = {...props}
  
  return (
    <form onSubmit={handleBlogSubmit}>
        <div>
          title: 
          <input 
          type="text" name="Title" value={title}
          onChange={({target}) => setTitle(target.value)}
          />
        </div>
        <div>
          author: 
          <input 
          type="text" name="Author" value={author}
          onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: 
          <input 
          type="text" name="Url" value={url}
          onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create blog</button>
    </form>
  )
}

export default BlogForm