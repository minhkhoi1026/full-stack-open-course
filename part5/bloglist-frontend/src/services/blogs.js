import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null 
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const formatedBlog = {
    title: newBlog.title,
    author: newBlog.author,
    url: newBlog.url,
  }
  const config = {headers: {Authorization: token}}

  const request = await axios.post(baseUrl, formatedBlog, config)
  return request.data
}

const update = async (id, blog) => {
  const request = await axios.put(`${baseUrl}/${id}`, blog)
  return request.data
}

const blogService = { getAll, create, update, setToken }

export default blogService