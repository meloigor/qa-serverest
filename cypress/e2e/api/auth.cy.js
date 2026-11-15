import 'cypress-schema-validator';
import { userFactory } from '../../support/factories/userFactory';
import { usuariosService } from '../../support/services/usuariosService';
import { loginService } from '../../support/services/loginService';
import { loginSuccessSchema, errorMessageSchema } from '../../support/schemas/loginSchemas';

describe('API - Auth @p0 @api @auth', () => {
  let user;
  let userId;

  beforeEach(() => {
    user = userFactory.build();
    usuariosService.create(user).then((res) => {
      userId = res.body._id;
    });
  });

  afterEach(() => {
    if (userId) usuariosService.delete(userId);
  });

  it('FTC00004 - should return a bearer token on valid credentials', () => {
    cy.section('**GIVEN** a registered user');
    cy.step(`user created with email ${user.email}`);

    cy.step('**WHEN** logging in with valid credentials');
    loginService
      .login(user.email, user.password)
      .validateSchema(loginSuccessSchema)
      .then((res) => {
        cy.step('**THEN** status is 200 and a Bearer token is returned');
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Login realizado com sucesso');
        expect(res.body.authorization).to.match(/^Bearer .+/);
      });
  });

  it('FTC00004 - should reject invalid password', () => {
    cy.step('**WHEN** logging in with a wrong password');
    loginService
      .login(user.email, 'wrong-password')
      .validateSchema(errorMessageSchema)
      .then((res) => {
        cy.step('**THEN** status is 401 with the exact error message');
        expect(res.status).to.eq(401);
        expect(res.body.message).to.eq('Email e/ou senha inválidos');
      });
  });
});
