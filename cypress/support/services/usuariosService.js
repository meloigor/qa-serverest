const apiUrl = () => Cypress.expose('apiUrl');

export const usuariosService = {
  create(user) {
    return cy.request({
      method: 'POST',
      url: `${apiUrl()}/usuarios`,
      body: user,
      failOnStatusCode: false,
    });
  },

  getById(id) {
    return cy.request({
      method: 'GET',
      url: `${apiUrl()}/usuarios/${id}`,
      failOnStatusCode: false,
    });
  },

  update(id, user) {
    return cy.request({
      method: 'PUT',
      url: `${apiUrl()}/usuarios/${id}`,
      body: user,
      failOnStatusCode: false,
    });
  },

  delete(id) {
    return cy.request({
      method: 'DELETE',
      url: `${apiUrl()}/usuarios/${id}`,
      failOnStatusCode: false,
    });
  },
};
