const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')
const sample = require('./sample')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const api = supertest(app)

const initialBlogs = sample.listWithMultiBlog

// utility function to generate token from user id
const genToken = (user_id) => {
  const user = sample.listMultipleUsers.find(user => user._id === user_id)
  const payload = {
    username: user.username,
    id: user._id
  }
  return jwt.sign(payload, config.KEY)
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // create user
  let promiseArr = sample.listMultipleUsers.map(obj => {
    const user = new User(obj)
    return user.save()
  })
  await Promise.all(promiseArr)

  // create blog
  promiseArr = sample.listWithMultiBlog.map(obj => {
    const blog = new Blog(obj)
    return blog.save()
  })
  await Promise.all(promiseArr)
})

afterAll(() => {
  mongoose.connection.close()
})

describe("fetch blog", () => {
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
})

describe("POST request", () => {
  test("successfully creates a new blog post", async () => {
    // send sample blog 
    await api.post('/api/blogs')
      .set('Authorization', `bearer ${genToken(sample.sampleBlog.user)}`)
      .send(sample.sampleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // check result
    const response = await api.get('/api/blogs')
    const resultBlogs = response.body.map(blog => {
      delete blog.id
      blog.user = blog.user.id
      return blog
    })
    expect(resultBlogs).toHaveLength(initialBlogs.length + 1)
    expect(resultBlogs).toContainEqual(sample.sampleBlog)
  })

  test("fails with the status code 401 Unauthorized if a token is not provided", async () => {
    // send sample blog 
    await api.post('/api/blogs')
      .send(sample.sampleBlog)
      .expect(401)
  })

  test('default of the likes value if missing is 0', async () => {
    const blogWithoutLikes = {
      title: "Dynamic Programming",
      author: "Rainbow Dango",
      url: "https://minhkhoi1026.github.io/2020-08-04-dp-for-final-exam",
      user: sample.listMultipleUsers[0]._id
    }

    const response = await api.post('/api/blogs')
                          .set('Authorization', `bearer ${genToken(blogWithoutLikes.user)}`)
                          .send(blogWithoutLikes)
    
    const resultedBlog = response.body
    expect(resultedBlog.likes).toBe(0)
  })

  test("responds 400 Bad Request if the title/url are missing", async () => {
    const blogWithoutTitle = {
      author: "Title missing",
      url: "https://example.com",
      user: sample.listMultipleUsers[0]._id
    }
    const blogWithoutUrl = {
      title: "Example",
      author: "URL missing",
      user: sample.listMultipleUsers[1]._id
    }
    await api.post('/api/blogs')
              .set('Authorization', `bearer ${genToken(blogWithoutTitle.user)}`)
              .send(blogWithoutTitle)
              .expect(400)
    await api.post('/api/blogs')
              .set('Authorization', `bearer ${genToken(blogWithoutUrl.user)}`)
              .send(blogWithoutUrl)
              .expect(400)
  })
})

describe("DELETE request", () => {
  test("successfully delete a valid blog post", async () => {
    const id = initialBlogs[0]._id
    await api.delete(`/api/blogs/${id}`)
      .set('Authorization', `bearer ${genToken(initialBlogs[0].user)}`)
      .expect(204)

    const response = await api.get('/api/blogs')
    const resultedIds = response.body.map(blog => blog.id)
    expect(resultedIds).toHaveLength(initialBlogs.length - 1)
    expect(resultedIds).not.toContain(id)
  })
})

describe("PUT request (update)", () => {
  test("successfully update a valid blog post", async () => {
    const newBlog = {id: initialBlogs[0]._id, ...sample.sampleBlog}

    const response = await api.put(`/api/blogs/${newBlog.id}`)
                              .send(newBlog)

    expect(response.body).toEqual(newBlog)
  })

  test("response 400 Bad Request for invalid id format", async () => {
    const id = "dsafasd"
    await api.delete(`/api/blogs/${id}`)
      .expect(400)
  })
})
