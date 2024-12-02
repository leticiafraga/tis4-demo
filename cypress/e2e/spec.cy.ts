/// <reference types="cypress" />

describe("Acceptance test", () => {
    it("logs in", () => {
        cy.visit("http://localhost:5173/login", { timeout: 20000 });

        cy.contains("Entrar", { timeout: 20000 }).click();
        cy.url().should("not.include", "login", { timeout: 20000 });

        cy.url().should("include", "list", { timeout: 20000 });
        cy.contains("Lista de Atletas", { timeout: 20000 }).should(
            "be.visible"
        );
    });
});
