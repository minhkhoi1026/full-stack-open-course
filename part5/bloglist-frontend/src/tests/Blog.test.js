import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from "@testing-library/dom"
import Blog from '../components/Blog'

describe('<Blog/>', () => {
  let component
  beforeEach(() => {
    const blog = {
      title: 'Testing Blog',
      author: 'Khoi',
      url: 'https://react.com',
      likes: 0,
    }

    component = render(
      <Blog blog={blog}/>
    )
  })

  test('render content right way', () => {
    const div = component.container.querySelector('.blogDiv')
    expect(div).toHaveTextContent('Title: Testing Blog')
    expect(div).toHaveTextContent('Author: Khoi')
    expect(div).not.toHaveTextContent('URL: ')
    expect(div).not.toHaveTextContent('Likes: ')
    expect(div).not.toHaveTextContent('Blog creator: ')
  })

  test('url and likes are shown when the view button clicked', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const div = component.container.querySelector('.blogDiv')

    expect(div).toHaveTextContent('Title: Testing Blog')
    expect(div).toHaveTextContent('Author: Khoi')
    expect(div).toHaveTextContent('URL: ')
    expect(div).toHaveTextContent('Likes: ')
  })
})
