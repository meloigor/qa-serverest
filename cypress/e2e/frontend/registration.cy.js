import { userFactory } from '../../support/factories/userFactory';
import { usuariosService } from '../../support/services/usuariosService';
import { LoginPage } from '../../support/pages/LoginPage';
import { RegisterPage } from '../../support/pages/RegisterPage';

const loginPage = new LoginPage();
const registerPage = new RegisterPage();

describe('Frontend - Registration @p0 @e2e @auth', () => {
  it('FTC00001 - should register a new user through the UI', () => {
    const user = userFactory.build();

    cy.section('**GIVEN** a visitor on the login page');
    loginPage.visit().goToRegister();
    cy.url().should('include', '/cadastrarusuarios');

    cy.step('**WHEN** filling the registration form with valid data');
    registerPage.fillForm(user).submit();
    cy.waitForNetworkIdle('POST', '/usuarios', 10000);

    cy.step('**THEN** the user is registered and logged in to the store');
    cy.url({ timeout: 10000 }).should('include', '/home');
    cy.get('[data-testid="logout"]').should('be.visible');

    cy.step('**AND** the user exists in the API (cleanup)');
    cy.request(`${Cypress.expose('apiUrl')}/usuarios?email=${user.email}`).then((res) => {
      const found = res.body.usuarios.find((u) => u.email === user.email);
      expect(found, 'user persisted').to.exist;
      usuariosService.delete(found._id);
    });
  });
});
