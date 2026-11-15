import { sel } from '../selectors/selectors';

export class StorePage {
  visit() {
    cy.visit('/home');
    return this;
  }

  shouldShowCatalog() {
    cy.get(sel.store.productCard).should('have.length.greaterThan', 0);
    return this;
  }

  searchProduct(name) {
    cy.get(sel.store.pesquisar).type(name);
    cy.get(sel.store.botaoPesquisar).click();
    return this;
  }

  addProductToList(name) {
    cy.contains(sel.store.productCard, name).find(sel.store.adicionarNaLista).click();
    return this;
  }
}
