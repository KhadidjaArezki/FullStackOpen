const listHelper = require('../utils/list_helper')
const blogList = require('../utils/dummyData')

describe('author with most likes', () => {
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
    likes: number of likes the blog got', () => {
      const author = {
        author:  'Edsger W. Dijkstra',
        likes: 5
      }

      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual(author)
  })
  
  test('when list has more than one blog, equals an object with two fields: \
    author: the name of the author with the highest number of likes, \
    likes: number of likes this author got in all blogs he/she wrote', () => {
      const author = {
        author: 'Edsger W. Dijkstra',
        likes: 17
      }

      const result = listHelper.mostLikes(blogList)
      expect(result).toEqual(author)
  })
  
  test('when list is empty, equals empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })
})