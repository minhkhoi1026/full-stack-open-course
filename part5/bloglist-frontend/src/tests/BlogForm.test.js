import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from "@testing-library/dom"
import BlogForm from '../components/BlogForm'

test('<BlogForm/> the event handler when a new blog is created received right details', () => {
  const createBlog = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  const title = component.container.querySelector('input[name=\'Title\']')
  fireEvent.change(title, { target: { value: 'This is title' } })

  const author = component.container.querySelector('input[name=\'Author\']')
  fireEvent.change(author, { target: { value: 'This is author' } })

  const url = component.container.querySelector('input[name=\'Url\']')
  fireEvent.change(url, { target: { value: 'This is url' } })

  const form = component.container.querySelector('form')
  fireEvent.submit(form)
  expect(createBlog.mock.calls[0][0].title).toBe('This is title')
  expect(createBlog.mock.calls[0][0].author).toBe('This is author')
  expect(createBlog.mock.calls[0][0].url).toBe('This is url')
})