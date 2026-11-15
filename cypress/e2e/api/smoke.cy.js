describe('Smoke @smoke', () => {
  it('FTC00000 - api is reachable', () => {
    cy.section('**GIVEN** the ServeRest API');
    cy.request(`${Cypress.expose('apiUrl')}/usuarios`).then((res) => {
      cy.step('**THEN** it responds with 200 and a list');
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('usuarios').that.is.an('array');
    });
  });
});
