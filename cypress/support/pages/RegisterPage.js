import { sel } from '../selectors/selectors';

export class RegisterPage {
  visit() {
    cy.visit('/cadastrarusuarios');
    return this;
  }

  fillForm({ nome, email, password, administrador }) {
    cy.get(sel.register.nome).type(nome);
    cy.get(sel.register.email).type(email);
    cy.get(sel.register.password).type(password, { log: false });
    if (administrador === 'true') cy.get(sel.register.administrador).check();
    return this;
  }

  submit() {
    cy.get(sel.register.cadastrar).click();
    return this;
  }
}
