const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const calculateSum = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(calculateSum, 0)
}

module.exports = {dummy, totalLikes}