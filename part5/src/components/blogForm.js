import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlogTitle, setBlogTitle] = useState('')
  const [newBlogAuthor, setBlogAuthor] = useState('')
  const [newBlogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      title
      <input
        type='text'
        value={newBlogTitle}
        name='Title'
        onChange={({ target }) => setBlogTitle(target.value)}
      />
      author
      <input
        type='text'
        value={newBlogAuthor}
        name='Author'
        onChange={({ target }) => setBlogAuthor(target.value)}
      />
      url
      <input
        type='text'
        value={newBlogUrl}
        name='Url'
        onChange={({ target }) => setBlogUrl(target.value)}
      />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm