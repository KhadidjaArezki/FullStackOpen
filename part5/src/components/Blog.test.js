import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    id: '62019b1c3588de77c2c22b73',
    title: 'THE MEDIA OBJECT SAVES HUNDREDS OF LINES OF CODE',
    author: 'NICOLE SULLIVAN',
    url: 'http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-...',
    likes: 0,
    user: '620123e0285d261b05d59f67'
  }

  const changeBlogMock = jest.fn()
  const removeBlogMock = jest.fn()
  let container

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        changeBlog={changeBlogMock}
        removeBlog={removeBlogMock}
      />
    ).container
  })

  test('renders the blog title only', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).toHaveStyle('display: none')

    screen.debug()
    // screen.debug(element)

    // expect(div).not.toHaveTextContent('author')
    // expect(div).not.toHaveTextContent('url')
    // expect(div).not.toHaveTextContent('likes')

    // const author = screen.queryByText('author')
    // expect(author).toBe(null)
    // const url = screen.queryByText('url')
    // expect(url).toBe(null)
    // const likes = screen.queryByText('likes')
    // expect(likes).toBe(null)
  })

  test('blog\'s author, url and number of likes are shown when the view button is clicked', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const div = container.querySelector('.blogDetails')
    expect(div).not.toHaveStyle('display: none')
    // const author = screen.queryByText('author')
    // expect(author).toBeDefined
    // const url = screen.queryByText('url')
    // expect(url).toBeDefined
    // const likes = screen.queryByText('likes')
    // expect(likes).toBeDefined

    // const div = container.querySelector('.blogDetails')
    // expect(div).toHaveTextContent('author')
    // expect(div).toHaveTextContent('url')
    // expect(div).toHaveTextContent('likes')
  })

  test('changeBlog handler is called twice if the likes button is clicked twice', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)
    // const likes = screen.queryByText('likes')
    const likesButton  = container.querySelector('.likes')
    expect(likesButton).toBeDefined
    userEvent.click(likesButton)
    expect(changeBlogMock.mock.calls).toHaveLength(1)
    userEvent.click(likesButton)
    expect(changeBlogMock.mock.calls).toHaveLength(2)
  })
})