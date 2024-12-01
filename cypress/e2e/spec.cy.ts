/// <reference types="cypress" />

describe('Smoke Test', () => {
  it('logs in', () => {
    cy.visit('https://leticiafraga.github.io/ti4-demo',{timeout: 20000})

    cy.contains('Entrar',{timeout: 20000}).click()
  })
})