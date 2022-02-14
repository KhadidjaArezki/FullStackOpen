const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('after database initialization', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  }, 100000)

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  }, 100000)
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  }, 100000)

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistantId = await helper.nonExistantId()

    console.log(validNonexistantId)

    await api
      .get(`/api/blogs/${validNonexistantId}`)
      .expect(404)
  }, 100000)

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  }, 100000)
})

describe('adding a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: '10 Fun Linux Command-Line Programs You Should Try When Bored',
      author: 'DEEPESH SHARMA',
      url: 'https://www.makeuseof.com/fun-linux-command-line-programs/', 
      likes: 0 
    }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYyMDEyM2UwMjg1ZDI2MWIwNWQ1OWY2NyIsImlhdCI6MTY0NDI1NzM3MywiZXhwIjoxNjQ0NTE2NTczfQ.VPUWHlYqzhOkU9UsyfWdhpkH3pS3GMeNkpFVct8Mtms'
    await api
      .post('/api/blogs')
      .set({'Authorization': `bearer ${token}`})
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

    const titles = response.body.map(b => b.title)
    expect(titles).toContain(
      '10 Fun Linux Command-Line Programs You Should Try When Bored'
    )
  }, 100000)

  test('if the likes property is missing from a blog, it defaults to zero', async () => {
    const newBlog = {
      title: 'THE MEDIA OBJECT SAVES HUNDREDS OF LINES OF CODE',
      author: 'NICOLE SULLIVAN',
      url: 'http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const addedBlog = blogsAtEnd[blogsAtEnd.length - 1]
    expect(addedBlog.likes).toEqual(0)

  }, 100000)

  test('if the title or url properties are missing from a blog, a 400 response status is sent', async () => {
    const newBlog = {
      author: 'NICOLE SULLIVAN',
      url: 'http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    console.log(response.body);
    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 100000)
})

describe('deleting a blog', () => {
  test('succeeds with statuscode 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  }, 100000)

  test('fails with statuscode 404 if blog does not exist', async () => {
    const validNonExistantId = await helper.nonExistantId()
    console.log(validNonExistantId);

    await api
      .delete(`/api/blogs/${validNonExistantId}`)
      .expect(404)
  }, 100000)
  
})

describe('updating a blog', () => {
  test('succeeds with statuscode 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDB()
    const blogToUpdate = blogsAtStart[0]

    const changedBlog = {
      likes: 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(changedBlog)
      .expect(200)
    
    const resultBlog = await api.get(`/api/blogs/${blogToUpdate.id}`)
    expect(resultBlog.body.likes).toEqual(changedBlog.likes)
    
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})