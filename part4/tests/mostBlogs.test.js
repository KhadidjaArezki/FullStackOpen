const listHelper = require('../utils/list_helper')
const blogList = require('../utils/dummyData')

describe('author with most blogs', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  test('when list has one blog, equals an object with two fields: \
    author: the name of the blog author, \
    blogs: 1', () => {
      const author = {
        author:  'Edsger W. Dijkstra',
        blogs: 1
      }

      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual(author)
  })
  
  test('when list has more than one blog, equals an object with two fields: \
    author: the name of the author with the highest number of blogs, \
    blogs: number of blogs created by this author', () => {
      const author = {
        author: 'Robert C. Martin',
        blogs: 3
      }

      const result = listHelper.mostBlogs(blogList)
      expect(result).toEqual(author)
  })
  
  test('when list is empty, equals empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
})