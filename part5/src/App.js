import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)

  // const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const authenticate = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setSuccessMessage('Logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(createdBlog => {
        setBlogs(blogs.concat(createdBlog))
        setSuccessMessage(`new blog "${createdBlog.title}" was added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage('Blog can not be added')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const changeBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
      })
      .catch(() => {
        setErrorMessage('Blog can not be updated')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this perosn?')) {
      blogService
        .remove(id)
        .then(() => {
          blogService.getAll().then(blogs => setBlogs(blogs))
          setSuccessMessage('blog was successfully deleted')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(() => {
          setErrorMessage('Blog can not be updated')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm authenticate={authenticate}/>
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' >
      <BlogForm createBlog={createBlog}/>
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} messageClass='error'/>
      <Notification message={successMessage} messageClass='success'/>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in <button onClick={() => handleLogout()}>logout</button></p>
          {blogForm()}
        </div>
      }
      {blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            changeBlog={changeBlog}
            removeBlog={removeBlog}
          />
        )}
    </div>
  )
}

export default App