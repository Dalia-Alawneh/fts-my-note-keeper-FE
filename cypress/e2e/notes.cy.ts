/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/');
});

describe('Note Keeper', () => {
  it('should add a new note and display it correctly', () => {
    cy.contains('Take a note...').click();
    cy.get('#title').type('cy test title');
    cy.get('#content').type('cy test content');
    cy.get('#color').click();
    cy.get('[data-testid="pink"]').click();
    cy.get('[data-testid="add-Note"]').click();
    cy.contains('cy test title').should('exist');
    cy.contains('cy test content').should('exist');
  });

  it('should update a note', () => {
    cy.contains('cy test title').parents('[data-testid="note-card"]').click();
    cy.get('#update-title').clear();
    cy.get('#update-title').type('cy updated');
    cy.get('[data-testid="update-note"]').click();
    cy.contains('cy updated').should('exist');
  });

  it('should delete a note', () => {
    cy.contains('cy updated')
      .parents('[data-testid="note-card"]')
      .find('[data-testid="delete-icon"]')
      .click();
    cy.get('[data-testid="delete-note"]').click();
    cy.contains('cy updated').should('not.exist');
  });
});
