const blogs = require("./dummyData")
const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}
  const highestLikes = Math.max(...blogs.map(blog => blog.likes))
  const favBlog =  blogs.find(blog => blog.likes === highestLikes)
  return favBlog
}

/* Returns an object containing two fields:
  author: the name of the author with the largest amount of blogs
  blogs: number of blogs created by this author
*/
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}
  /* find the author with largest number of blogs 
    1. Create an object that contains the name of each author and the initial value 0
  */
  // const authors = {}
  // blogs.forEach(blog => {
  //   if (!authors.hasOwnProperty(blog.author)) {
  //     authors[blog.author] = 0
  //   }
  //   authors[blog.author]+=1
  // });
  /*
    2. Find the largest number of blogs created by one author
  */
  // const highestBlogsNumber =  Math.max(...Object.values(authors).map(value => Number(value)))
  /*
  3. Find the name of the author with most blogs
   */
  // let mostBlogger = ''
  // for(let element in authors) {
  //   if (authors[element] === highestBlogsNumber) {
  //     mostBlogger = element
  //   }
  // }

  // return {
  //   author: mostBlogger,
  //   blogs: highestBlogsNumber
  // }

  /* Method 2: using reduce and filter and find */
  return blogs.reduce((authors, blog) => {
    authors.push({
      author: blog.author, 
      blogs: blogs.filter(b => b.author ===  blog.author).length
    })
    return authors
  }, [])
  .filter((element, index, self) => //take first occurence of object
    index === self.findIndex(o => (o.author === element.author))
  )
  .find((author, _, self) => author.blogs === Math.max(...self.map(o => o.blogs)))

  /* Method 3: using lodash*/
  // return _.reverse(
  //   _.sortBy(
  //     Object.entries(_.countBy(blogs, (blog) => blog.author))
  //       .reduce((arr, author) => arr.concat({
  //         author: author[0],
  //         blogs: author[1]
  //       }), [])
  //   ,['blogs'])
  // )[0]
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  return _.reverse(
    _.sortBy(
      Object.entries(
        blogs.reduce((aggr, element, index, self) => {
          if (!(element.author in aggr)) {
            aggr[element.author] = []
          }
          aggr[element.author].push(element)
          return aggr
        }, {})
      )
      .reduce((aggr, author) => {
        aggr.push({
            author: author[0],
            likes: author[1].reduce((likes, blog) => {
              return likes + blog.likes
            }, 0)
        })
        return aggr
      }, [])
    , ['likes'])
  )[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}