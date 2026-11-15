const apiUrl = () => Cypress.expose('apiUrl');

export const loginService = {
  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${apiUrl()}/login`,
      body: { email, password },
      failOnStatusCode: false,
    });
  },
};
