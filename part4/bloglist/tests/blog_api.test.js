const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const sample = require('./bloglist_sample')
const mongoose = require('mongoose')
const { notesInDb } = require('../../../example/notes_backend/tests/test_helper')

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

describe("blog list", () => {
  test("return correct amount of blogs posts", async () =>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test("return blog posts in JSON format", async () =>{
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
  })
  
  test("has unique identifier property named id", async () =>{
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

  test("POST request successfully creates a new blog post", async () => {
    await api.post('/api/blogs')
      .send(sample.sampleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const resultBlogs = response.body.map(blog => {
      delete blog.id
      return blog
    })
    expect(resultBlogs).toHaveLength(initialBlogs.length + 1)
    expect(resultBlogs).toContainEqual(sample.sampleBlog)
  })

  test('default of the likes value if missing is 0', async () => {
    const blogWithoutLikes = {
      title: "Dynamic Programming",
      author: "Rainbow Dango",
      url: "https://minhkhoi1026.github.io/2020-08-04-dp-for-final-exam/",
    }

    const response = await api.post('/api/blogs').send(blogWithoutLikes)
    
    const resultedBlog = response.body
    expect(resultedBlog.likes).toBe(0)
  })

  test.only("responds 400 Bad Request if the title/url are missing (POST)", async () => {
    const blogWithoutTitle = {
      author: "Title missing",
      url: "https://example.com",
    }
    const blogWithoutUrl = {
      title: "Example",
      author: "URL missing",
    }
    await api.post('/api/blogs').send(blogWithoutTitle).expect(400)
    await api.post('/api/blogs').send(blogWithoutUrl).expect(400)
  })
})
