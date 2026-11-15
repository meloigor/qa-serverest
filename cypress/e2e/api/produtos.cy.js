import 'cypress-schema-validator';
import { userFactory } from '../../support/factories/userFactory';
import { productFactory } from '../../support/factories/productFactory';
import { usuariosService } from '../../support/services/usuariosService';
import { loginService } from '../../support/services/loginService';
import { produtosService } from '../../support/services/produtosService';
import {
  produtoSchema,
  createProdutoResponseSchema,
  messageSchema,
} from '../../support/schemas/produtoSchemas';

describe('API - Products @p0 @api @products', () => {
  let token;
  let adminId;
  const productIds = [];

  before(() => {
    const admin = userFactory.build({ administrador: 'true' });
    usuariosService.create(admin).then((res) => {
      adminId = res.body._id;
      loginService.login(admin.email, admin.password).then((login) => {
        token = login.body.authorization;
      });
    });
  });

  after(() => {
    productIds.forEach((id) => produtosService.delete(id, token));
    if (adminId) usuariosService.delete(adminId);
  });

  it('FTC00006 - should create, read, update and delete a product', () => {
    const product = productFactory.build();

    cy.step('**GIVEN** an authenticated admin user and a unique product payload');
    produtosService
      .create(product, token)
      .validateSchema(createProdutoResponseSchema)
      .then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        productIds.push(res.body._id);
        cy.wrap(res.body._id).as('productId');
      });

    cy.get('@productId').then((productId) => {
      cy.step('**WHEN** reading the created product');
      produtosService
        .getById(productId, token)
        .validateSchema(produtoSchema)
        .then((res) => {
          cy.step('**THEN** stored data matches the payload');
          expect(res.status).to.eq(200);
          expect(res.body.nome).to.eq(product.nome);
          expect(res.body.preco).to.eq(product.preco);
          expect(res.body.quantidade).to.eq(product.quantidade);
        });

      cy.step('**WHEN** updating price and quantity');
      const updated = { ...product, preco: product.preco + 50, quantidade: product.quantidade + 5 };
      produtosService.update(productId, updated, token).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Registro alterado com sucesso');
      });

      cy.step('**THEN** the changes are persisted');
      produtosService.getById(productId, token).then((res) => {
        expect(res.body.preco).to.eq(updated.preco);
        expect(res.body.quantidade).to.eq(updated.quantidade);
      });

      cy.step('**WHEN** deleting the product');
      produtosService
        .delete(productId, token)
        .validateSchema(messageSchema)
        .then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('Registro excluído com sucesso');
        });

      cy.step('**THEN** the product no longer exists');
      produtosService.getById(productId, token).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Produto não encontrado');
      });
      productIds.splice(productIds.indexOf(productId), 1);
    });
  });

  it('FTC00006 - should reject product creation without token', () => {
    cy.step('**WHEN** creating a product without an Authorization header');
    produtosService
      .create(productFactory.build())
      .validateSchema(messageSchema)
      .then((res) => {
        cy.step('**THEN** status is 401');
        expect(res.status).to.eq(401);
        expect(res.body.message).to.contain('Token de acesso');
      });
  });
});
