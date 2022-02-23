import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls createBlog with the right details', () => {
  const mockHandler = jest.fn()
  const { container } = render(<BlogForm createBlog={mockHandler}/>)
  const button  = screen.getByText('create')
  userEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
})