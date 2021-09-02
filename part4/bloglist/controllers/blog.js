const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
                      .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

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

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (user._id.toString() !== blog.user.toString())
    return response.status(403).json({ error: 'request user need to be blog creator' })
  
  user.blogs = user.blogs.filter(idBlog => idBlog.toString() != blog._id.toString())

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