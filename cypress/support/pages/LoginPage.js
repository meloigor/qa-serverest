import { sel } from '../selectors/selectors';

export class LoginPage {
  visit() {
    cy.visit('/login');
    return this;
  }

  fillCredentials(email, password) {
    cy.get(sel.login.email).type(email);
    cy.get(sel.login.senha).type(password, { log: false });
    return this;
  }

  submit() {
    cy.get(sel.login.entrar).click();
    return this;
  }

  goToRegister() {
    cy.get(sel.login.cadastrar).click();
    return this;
  }
}
