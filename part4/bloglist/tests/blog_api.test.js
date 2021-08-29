const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const sample = require('./bloglist_sample')
const mongoose = require('mongoose')

const api = supertest(app)

const initialBlogs = sample.listWithMultiBlog

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjs = initialBlogs.map(blog => new Blog(blog))
  const promiseArr = blogObjs.map(blog => blog.save())
  await Promise.all(promiseArr) 
})

afterAll(() => {
  mongoose.connection.close()
})

test("blog list return correct amount of blogs posts", async () =>{
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test("blog list return blog posts in JSON format", async () =>{
  await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})