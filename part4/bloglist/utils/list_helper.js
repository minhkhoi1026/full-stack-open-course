const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const calculateSum = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(calculateSum, 0)
}

const favoriteBlog = (blogs) => {
  const mappedBlogs = blogs.map(blog => {
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }
  })
  const calculateMaxLikes = (res, blog) => {
    if (res.likes > blog.likes)
      return res
    return blog
  }

  return mappedBlogs.length == 0 ? {} : mappedBlogs.reduce(calculateMaxLikes, mappedBlogs[0])
}

const mostBlogs = (blogs) => {
  // handle empty list case
  if (blogs.length == 0)
    return {}
  // general case
  let authors = _.groupBy(blogs, "author")
  authors = _.map(authors, (blogs, author_name) => {
    return {
      author: author_name,
      blogs: blogs.length
    }
  })
  return _.maxBy(authors, 'blogs')
}

const mostLikes = (blogs) => {
  // handle empty list case
  if (blogs.length == 0)
    return {}
  // general case
  let authors = _.groupBy(blogs, "author")
  authors = _.map(authors, (blogs, author_name) => {
    return {
      author: author_name,
      likes: _.sumBy(blogs, 'likes')
    }
  })
  return _.maxBy(authors, 'likes')
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}