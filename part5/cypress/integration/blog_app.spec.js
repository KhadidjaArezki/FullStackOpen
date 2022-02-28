describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown by default', function() {
    cy.get('.login')
      .should('contain', 'login')
      .click()
    cy.get('.loginForm')
  })

  describe('when user logs in', function() {
    it('succeeds with correct credentials', function() {
      cy.login({
        username: 'root',
        password: 'salainen'
      })

      cy.contains('Superuser logged-in')

    })

    it('fails with wrong credentials', function() {
      cy.login({
        username: 'root',
        password: 'wrong'
      })

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'root',
        password: 'salainen'
      })
      cy.createBlog({
        title: 'How to Setup a CI/CD Pipeline with GitHub Actions and AWS',
        author: 'Nyior Clement',
        url: 'https://www.freecodecamp.org/news/how-to-setup-a-ci-cd-pipeline-with-github-actions-and-aws/'
      })
    })

    it('A blog can be created', function() {
      cy.contains('How to Setup a CI/CD Pipeline with GitHub Actions and AWS')
    })

    it('Users can like a blog', function() {
      cy.contains('view').click()
      cy.get('.likes')
        .click()
        .should('contain', 1)
    })

    it('A user who created a blog can delete it', function() {
      cy.contains('view').click()
      cy.get('.delete')
        .should('not.have.css', 'display', 'none')
        .click()
      cy.should('not.contain', 'How to Setup a CI/CD Pipeline with GitHub Actions and AWS')
    })

    it.only('blogs are ordered by number of likes', function() {
      cy.createBlog({ title: 'first blog', author: 'first author', url:'http://first_url.com', likes: 0 })
      cy.createBlog({ title: 'second blog', author: 'second author', url:'http://second_url.com', likes: 1 })
      cy.createBlog({ title: 'third blog', author: 'third author', url:'http://third.com', likes: 2 })

      cy.reload()

      cy.get('.blogBrief')
        .then(blogs => {
          cy.wrap(blogs[0]).find('span').should('contain', 'third blog')
        })

    })
  })
})