# Skill: Add a new API test

How to add a Cypress API scenario to this suite. Applies to any contributor or AI agent.

## Conventions

- Specs live in `cypress/e2e/api/*.cy.js`
- Every test has an ID (`FTC#####`) in the `it` title and `@cypress/grep` tags (`@api`, `@p0`, feature tag)
- `import 'cypress-schema-validator'` and chain `.validateSchema(schema)` on `cy.request` — status codes alone are not enough
- After POST/PUT/DELETE, re-GET the resource and assert the data actually changed
- Use `cy.step()`/`cy.section()` (gherkin style) for readable logs

## Steps

1. **Service object**: add/extend `cypress/support/services/<resource>Service.js`. One method per endpoint; use `Cypress.expose('apiUrl')` for the base URL; `failOnStatusCode: false` so negative cases are testable.
2. **Schemas**: add JSON schemas in `cypress/support/schemas/<resource>Schemas.js` (required fields + property types).
3. **Factories**: add faker generators in `cypress/support/factories/` — unique values every run, no hardcoded data.
4. **Auth**: obtain tokens via `loginService.login(email, password)` and pass the `authorization` header through the service method.
5. **Spec**: write the test with create → re-GET → mutate → re-GET → delete → re-GET (gone) coverage where applicable, plus negative cases (401, 400, duplicates).
6. **Cleanup**: delete created entities in `after`/`afterEach`.
7. **Verify**: `npm run cy:run -- --spec cypress/e2e/api/<spec>.cy.js`; `npm run lint` clean.
