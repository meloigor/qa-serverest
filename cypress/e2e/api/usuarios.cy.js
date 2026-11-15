import 'cypress-schema-validator';
import { userFactory } from '../../support/factories/userFactory';
import { usuariosService } from '../../support/services/usuariosService';
import {
  usuarioSchema,
  createUserResponseSchema,
  messageSchema,
} from '../../support/schemas/usuarioSchemas';

describe('API - Users @p0 @api @users', () => {
  const createdIds = [];

  const createUser = (user) =>
    usuariosService.create(user).then((res) => {
      if (res.body._id) createdIds.push(res.body._id);
      return res;
    });

  afterEach(() => {
    createdIds.forEach((id) => usuariosService.delete(id));
    createdIds.length = 0;
  });

  it('FTC00005 - should create, read, update and delete a user', () => {
    const user = userFactory.build({ administrador: 'true' });

    cy.step('**GIVEN** a new unique user payload');
    createUser(user)
      .validateSchema(createUserResponseSchema)
      .then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        cy.wrap(res.body._id).as('userId');
      });

    cy.get('@userId').then((userId) => {
      cy.step('**WHEN** reading the created user');
      usuariosService
        .getById(userId)
        .validateSchema(usuarioSchema)
        .then((res) => {
          cy.step('**THEN** stored data matches the payload');
          expect(res.status).to.eq(200);
          expect(res.body.nome).to.eq(user.nome);
          expect(res.body.email).to.eq(user.email);
          expect(res.body.administrador).to.eq('true');
        });

      cy.step('**WHEN** updating the user name');
      const updated = { ...user, nome: `${user.nome} Updated` };
      usuariosService.update(userId, updated).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Registro alterado com sucesso');
      });

      cy.step('**THEN** the change is persisted');
      usuariosService.getById(userId).then((res) => {
        expect(res.body.nome).to.eq(updated.nome);
      });

      cy.step('**WHEN** deleting the user');
      usuariosService
        .delete(userId)
        .validateSchema(messageSchema)
        .then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('Registro excluído com sucesso');
        });

      cy.step('**THEN** the user no longer exists');
      usuariosService.getById(userId).then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Usuário não encontrado');
      });
      createdIds.splice(createdIds.indexOf(userId), 1);
    });
  });

  it('FTC00005 - should reject duplicate email', () => {
    const user = userFactory.build();

    cy.step('**GIVEN** an existing user');
    createUser(user).then(() => {
      cy.step('**WHEN** creating another user with the same email');
      createUser({ ...userFactory.build(), email: user.email })
        .validateSchema(messageSchema)
        .then((res) => {
          cy.step('**THEN** status is 400 with the duplicate-email message');
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Este email já está sendo usado');
        });
    });
  });
});
