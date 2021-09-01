const listMultipleUsers = [
  {
    name: "A B C",
    username: "abc",
    password: "secret"
  },
  {
    name: "Khoi",
    username: "rainbowdango",
    password: "ultrasecret"
  },
  {
    name: "123",
    username: "123",
    password: "ultimatesecret"
  }
]

const invalidUsers = [
  {
    name: "Khoi",
    username: "1",
    password: "ultrasecret"
  },
  {
    name: "123",
    username: "123",
    password: "ultimatesecret"
  },
  {
    name: "123",
    username: "123",
    password: "ultimatesecret"
  }
]

module.exports = {listMultipleUsers, invalidUsers}