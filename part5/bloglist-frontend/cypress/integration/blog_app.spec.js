describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Minh Khoi',
      username: 'minhkhoi',
      password: 'superman'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
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
  })
})