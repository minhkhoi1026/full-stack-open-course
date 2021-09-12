describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Minh Khoi',
      username: 'minhkhoi',
      password: 'superman'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('#login-form').should('contain', 'username') 
                        .should('contain', 'password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('minhkhoi')
      cy.get('#password').type('superman')
      cy.get('#login-button').click()

      cy.get('.notif').should('contain', 'Logged in successful')
                      .should('have.css', 'color', 'rgb(0, 128, 0)')
                      .should('have.css', 'border-style', 'solid')
      cy.contains('Minh Khoi logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('minhkhoi')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
                      .should('have.css', 'color', 'rgb(255, 0, 0)')
                      .should('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Minh Khoi logged in')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({username: 'minhkhoi', password: 'superman'})
      })
  
      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#blog-form').find('input[name=\'Title\']').type('Testing title')
        cy.get('#blog-form').find('input[name=\'Author\']').type('Testing author')
        cy.get('#blog-form').find('input[name=\'Url\']').type('Testing url')
        cy.contains('create blog').click()

        cy.contains('Testing title')
        cy.contains('Testing author')
        cy.contains('Testing title').parent().contains('view').click()
        cy.contains('Testing url')
      })

      describe('When there exists blog', function () {
        beforeEach(function() {
          cy.createBlog({title: 'testing title', author: 'testing author', url: 'testing url'})
        })
        
        it('User can like a blog', function () {
          cy.contains('testing title').parent().as('testBlog')
          cy.get('@testBlog').contains('view').click()
          cy.get('@testBlog').contains('like').click()

          cy.get('@testBlog').contains('Likes: 1')
        })

        it('Blog can be removed by its creator', function () {
          cy.contains('testing title').parent().as('testBlog')
          cy.get('@testBlog').contains('view').click()
          cy.get('@testBlog').contains('remove blog').click()

          cy.get('html').should('not.contain', 'testing title')
        })

        it.only('Blog cannot be removed by user that are not creator', function() {
          cy.createUser({
            name: 'Your Dada',
            username: 'yourdada',
            password: 'yourmama'
          })
          cy.login({ username: 'yourdada', password: 'yourmama' })
          cy.contains('testing title').parent().as('testBlog')
          cy.get('@testBlog').contains('view').click()

          cy.get('@testBlog').should('not.contain', 'remove blog')
        })
      })
    })
  })
})