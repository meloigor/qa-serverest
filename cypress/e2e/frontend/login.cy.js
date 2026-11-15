import { userFactory } from '../../support/factories/userFactory';
import { usuariosService } from '../../support/services/usuariosService';
import { LoginPage } from '../../support/pages/LoginPage';
import { StorePage } from '../../support/pages/StorePage';
import { sel } from '../../support/selectors/selectors';

const loginPage = new LoginPage();
const storePage = new StorePage();

describe('Frontend - Login @p0 @e2e @auth', () => {
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

  it('FTC00002 - should log in through the UI and see the catalog', () => {
    cy.section('**GIVEN** a registered user on the login page');
    loginPage.visit();

    cy.step('**WHEN** logging in with valid credentials');
    loginPage.fillCredentials(user.email, user.password).submit();
    cy.waitForNetworkIdle('POST', '/login', 10000);

    cy.step('**THEN** the store home renders the product catalog');
    cy.url({ timeout: 10000 }).should('include', '/home');
    storePage.shouldShowCatalog();

    cy.step('**AND** the session token is stored like the frontend does');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'serverest/userToken')
      .should('match', /^Bearer /);
    cy.get(sel.nav.logout).should('be.visible');
  });
});
