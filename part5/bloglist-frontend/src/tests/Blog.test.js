import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('<Blog/> render content reight way', () => {
  const blog = {
    title: 'Testing Blog',
    author: 'Khoi',
    url: 'https://react.com',
    likes: 0,
  }

  const component = render(
    <Blog blog={blog}/>
  )

  component.debug()

  const div = component.container.querySelector('.blogDiv')
  expect(div).toHaveTextContent('Title: Testing Blog')
  expect(div).toHaveTextContent('Author: Khoi')
  expect(div).not.toHaveTextContent('URL: ')
  expect(div).not.toHaveTextContent('Likes: ')
  expect(div).not.toHaveTextContent('Blog creator: ')
})