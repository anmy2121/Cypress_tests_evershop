describe('template spec', () => {
  const baseurl = Cypress.env('baseUrl')
  it('passes', () => {
    //demander a cypress de se rendre sur une page web
    cy.visit('/')
  })

  it('should have a time to go to login page on the home page', () => {
    cy.visit('/')
    cy.wait(2000)
  })

  it('should have a link to go to login', () => {
    cy.visit('/')
    //cibler l'element lien ('a') qui est contenu dans une balise qui a la classe "header"
    cy.get('.header a[href="/account/login"]').click()
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
  })

  it('should be successful to login into account with existing credentials', () => {
    cy.visit('/account/login')
    //actuellement on est sur la page login
    cy.get('input[name="email"]').type('folok63378@hupoi.com')
    cy.get('input[name="password"]').type('123456789')

    cy.get('button[type="submit"]').click()
    //nous sommes redigé sur la page d'accueil: le login a fonctionné
    //cy.url().should('be.oneOf', [baseurl, baseurl+'/'])
    cy.visit('/account')
    cy.get('.header a[href="/account"]').click()

    cy.get('input[name="email"]').should('not.exist')
    cy.get('input[name="password"]').should('not.exist')
    cy.get('.account-details').should('contain', 'folok63378@hupoi.com'), {timeout: 1000}
  })

  it('should be able to log out', () => {
    //Fonctionnellement, on cherche comment on se log out
    // ou est la page?
    //ou est le bouton pour se log out
    cy.visit('/account/login')
    //actuellement on est sur la page login
    cy.get('input[name="email"]').type('folok63378@hupoi.com')
    cy.get('input[name="password"]').type('123456789')

    cy.get('button[type="submit"]').click()
    cy.visit('/account')
    cy.contains('Logout').click()

  })

  it('should display an error on invalid password',() => {
    cy.visit('/account/login')
    cy.get('input[name="email"]').type('folok63378@hupoi.com')
    cy.get('input[name="password"]').type('12345678')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password').should('exist')
})


  it('should display an error on invalid mail',() => {
    cy.visit('/account/login')
    cy.get('input[name="email"]').type('folok@hupoi.com')
    cy.get('input[name="password"]').type('123456789')
    cy.get('button[type="submit"]').click()
    cy.contains('Invalid email or password').should('exist')
  })


  it('should display an error on empty mail',() => {
    cy.visit('/account/login')
    cy.get('input[name="password"]').type('123456789')
    cy.get('button[type="submit"]').click()
    cy.contains('This field can not be empty').should('exist')
  })

})






