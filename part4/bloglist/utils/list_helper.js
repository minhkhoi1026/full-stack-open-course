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

module.exports = {dummy, totalLikes, favoriteBlog}