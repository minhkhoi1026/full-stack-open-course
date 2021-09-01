const supertest = require('supertest')
const app = require('../app')
const sample = require('./users_sample')
const User = require('../models/user')
const user = require('../models/user')
const mongoose = require('mongoose')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const promiseArr = sample.listMultipleUsers.map(obj => {
    const user = new User(obj)
    return user.save()
  })

  await Promise.all(promiseArr)
})

afterAll(() => {
  mongoose.connection.close()
})

describe('Adding user', () => {
  test('invalid users are not created', async () => {
    const promiseRequests = sample.invalidUsers.map(
      (user) => {
        return api
        .post('/api/users')
        .send(user)
      }
    )
    await Promise.all(promiseRequests)
    
    const resultUsers = await api.get('/api/users')
    expect(resultUsers.body).toHaveLength(sample.listMultipleUsers.length)
  })

  test('invalid add user operation returns a suitable status code and error message', 
  async () => {
    const promiseRequests = sample.invalidUsers.map(
      (user) => {
        return api
        .post('/api/users')
        .send(user).expect(400)
      }
    )
    await Promise.all(promiseRequests)
  })
})
