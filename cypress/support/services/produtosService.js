const apiUrl = () => Cypress.expose('apiUrl');

const authed = (method, path, token, body) =>
  cy.request({
    method,
    url: `${apiUrl()}${path}`,
    body,
    headers: token ? { Authorization: token } : {},
    failOnStatusCode: false,
  });

export const produtosService = {
  create: (product, token) => authed('POST', '/produtos', token, product),
  getById: (id, token) => authed('GET', `/produtos/${id}`, token),
  update: (id, product, token) => authed('PUT', `/produtos/${id}`, token, product),
  delete: (id, token) => authed('DELETE', `/produtos/${id}`, token),
};
