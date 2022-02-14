const listHelper = require('../utils/list_helper')
const blogList = require('../utils/dummyData')

describe('favorite blog', () => {
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
  const blog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
  }

  test('when list has one blog, equals this blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has more than one blog, equals the blog with the highest likes', () => {  
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual(blog)
  })

  test('when list is empty, equals empty object', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })
})
