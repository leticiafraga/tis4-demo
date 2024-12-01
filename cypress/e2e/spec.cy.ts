/// <reference types="cypress" />

describe('Acceptance test', () => {
  it('logs in', () => {
    cy.visit('http://localhost:5173',{timeout: 20000})

    cy.contains('Entrar',{timeout: 20000}).click()
  })
})