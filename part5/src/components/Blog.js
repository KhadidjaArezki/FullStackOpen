import { useState } from 'react'

const Blog = ({ blog, changeBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const detailsHidden = { display: visible ? 'none' : '' }
  const detailsShown = { display: visible ? '' : 'none' }


  const toggleVisibility = () => (
    setVisible(!visible)
  )

  const updateBlog = (event) => {
    event.preventDefault()
    console.log(blog)
    const likes = event.target.textContent
    changeBlog(blog.id, {
      // ...blog,
      likes: Number(likes) + 1
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    removeBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <div style={detailsHidden}>
        <span>{blog.title} </span>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={detailsShown}>
        <div>
          <span>{blog.title} </span>
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <p>author: {blog.author}</p>
        <p>url: {blog.url}</p>
        <div>
          <span>likes </span>
          <button onClick={updateBlog}>{blog.likes}</button>
        </div>
        <button
          style={{
            display: blog.user ? '' : 'none',
            backgroundColor: 'lightblue'
          }}
          onClick={deleteBlog}
        >remove</button>
      </div>
    </div>
  )
}

export default Blog