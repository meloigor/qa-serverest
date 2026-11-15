import { userFactory } from '../../support/factories/userFactory';
import { productFactory } from '../../support/factories/productFactory';
import { usuariosService } from '../../support/services/usuariosService';
import { produtosService } from '../../support/services/produtosService';
import { createUserAndSession, injectSession } from '../../support/helpers/authHelper';
import { StorePage } from '../../support/pages/StorePage';
import { ShoppingListPage } from '../../support/pages/ShoppingListPage';

const storePage = new StorePage();
const shoppingListPage = new ShoppingListPage();

describe('Frontend - Add to list @p0 @e2e @cart', () => {
  let adminId;
  let shopperId;
  let productId;
  let adminToken;

  after(() => {
    if (productId) produtosService.delete(productId, adminToken);
    if (adminId) usuariosService.delete(adminId);
    if (shopperId) usuariosService.delete(shopperId);
  });

  it('FTC00003 - should add a product to the shopping list and validate its data', () => {
    const product = productFactory.build();

    cy.section('**GIVEN** an existing product and a logged-in shopper');
    createUserAndSession(userFactory.build({ administrador: 'true' })).then((admin) => {
      adminId = admin.id;
      adminToken = admin.token;
      produtosService.create(product, adminToken).then((res) => {
        productId = res.body._id;
      });
    });

    createUserAndSession(userFactory.build()).then((shopper) => {
      shopperId = shopper.id;
      injectSession(shopper);
    });

    cy.step('**WHEN** adding the product to the shopping list from the store');
    storePage.visit().searchProduct(product.nome).addProductToList(product.nome);
    cy.waitForNetworkIdle(10000);

    cy.step('**THEN** the list shows the product with name, price and quantity');
    cy.url().should('include', '/minhaListaDeProdutos');
    shoppingListPage.shouldContainProduct(product.nome, product.preco, 1);
  });
});
