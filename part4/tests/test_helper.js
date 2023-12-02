const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Measuring your progress in Web Development: why is it important and how to do it',
    author: 'Damian Demasi',
    url: 'https://community.codenewbie.org/colocodes/measuring-your-progress-in-web-development-why-is-it-important-and-how-to-do-it-468j',
    likes: 0
  },
  {
    title: '10 Fun Linux Command-Line Programs You Should Try When Bored',
    author: 'DEEPESH SHARMA',
    url: 'https://www.makeuseof.com/fun-linux-command-line-programs/',
    likes: 0
  }
]

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const nonExistantId = async () => {
  const blog = new Blog({
    title: 'This is the title of a non-existant blog',
    author: 'Non Existant',
    url: 'www.non-existance.neverland.not/the-art-of-no-blogging',
    likes: -1
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs,
  blogsInDB,
  usersInDb,
  nonExistantId
}