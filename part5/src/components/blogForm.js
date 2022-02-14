const blogForm = (addBlog, newBlogTitle, newBlogAuthor, newBlogUrl,
                  handleTitleChange, handleAuthorChange, handleUrlChange) => (
  <form onSubmit={addBlog}>
    title
    <input
      type='text'
      value={newBlogTitle}
      name='Title'
      onChange={handleTitleChange}
    />
    author
    <input
      type='text'
      value={newBlogAuthor}
      name='Author'
      onChange={handleAuthorChange}
    />
    url
    <input
      type='text'
      value={newBlogUrl}
      name='Url'
      onChange={handleUrlChange}
    />
    <button type="submit">save</button>
  </form>  
)

export default blogForm