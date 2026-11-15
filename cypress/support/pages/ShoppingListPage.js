import { sel } from '../selectors/selectors';

export class ShoppingListPage {
  shouldContainProduct(name, price, quantity) {
    cy.get(sel.shoppingList.productName).should('contain.text', `Produto:${name}`);
    if (price) cy.contains(`Preço R$${price}`).should('be.visible');
    cy.get(sel.shoppingList.productQuantity).should('contain.text', `Total: ${quantity}`);
    return this;
  }
}
