# Skill: Add a new E2E (frontend) test

How to add a Cypress E2E scenario to this suite. Applies to any contributor or AI agent.

## Conventions

- Specs live in `cypress/e2e/frontend/*.cy.js`
- Every test has an ID: `FTC#####` functional, `NFTC#####` non-functional — include it in the `it` title
- Tag tests with `@cypress/grep` tags in the `describe` title: `@p0`, `@e2e`, plus a feature tag (`@auth`, `@cart`, ...)
- Use `cy.section()` / `cy.step()` (cypress-plugin-steps) with gherkin-style Given/When/Then
- Never `cy.wait(ms)` — use `cy.waitForNetworkIdle()` (cypress-network-idle). Never `{ force: true }`.
- Assertions check text/data (exact messages, cells, computed values), not only visibility

## Steps

1. **Explore the flow first** using MCP browser tools (see `explore-with-mcp-browser` skill) — verify selectors and behavior before writing code.
2. **Add selectors** to `cypress/support/selectors/selectors.js` under the page key. Always prefer `data-testid`; fallback `cy.contains('button', 'Label')`.
3. **Extend or create a Page Object** in `cypress/support/pages/<Page>Page.js`. Page methods speak screen language (`fillForm`, `submit`, `shouldShowCatalog`) and return `this` for chaining. Do NOT add `Cypress.Commands` unless the same browser-level action is needed by 3+ pages.
4. **Fixtures via API**: create users/products with the services in `cypress/support/services/` and factories in `cypress/support/factories/` (faker). Unique data every run — the environment is shared.
5. **Auth**: only use the UI login when login is the test goal. Otherwise use `createUserAndSession` + `injectSession` from `cypress/support/helpers/authHelper.js`.
6. **Cleanup**: delete everything you created in `after`/`afterEach` via the API services.
7. **Verify**: `npm run cy:run:e2e -- --spec <your-spec>` must pass in Chrome; `npm run lint` must be clean.
