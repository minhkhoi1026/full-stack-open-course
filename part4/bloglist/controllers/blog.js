const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
                      .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, config.KEY)
  if (!decodedToken || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    user: user._id
  })
  const savedBlog = await newBlog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.KEY)

  const blog = await Blog.findById(request.params.id)
  if (decodedToken.id.toString() !== blog.user.toString())
    return response.status(403).json({ error: 'request user need to be blog creator' })
  
  const user = await User.findById(blog.user)
  user.blogs = user.blogs.filter(idBlog => idBlog != blog._id.toString())

  blog.remove()
  user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes,
    url: request.body.url
  }
  const resultBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
  response.json(resultBlog)
})

module.exports = blogsRouter