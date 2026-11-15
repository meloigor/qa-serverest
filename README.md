# qa-serverest

Automated QA suite for [ServeRest](https://serverest.dev) — 3 E2E scenarios against the [frontend](https://front.serverest.dev) and 3 API scenarios, built with Cypress + JavaScript.

[README em português](README.pt-BR.md)

## Stack

- **Cypress 16** (Chrome headless) with `cy.request`-based API tests
- **Page Object Model** for E2E · service objects + factories for API
- `@faker-js/faker` — random test data
- `cypress-network-idle` — no explicit waits
- `cypress-plugin-steps` — gherkin-style numbered steps in the log
- `cypress-schema-validator` — JSON schema validation on API responses
- `@cypress/grep` — tag-based test selection (`@p0`, `@e2e`, `@api`, ...)
- `cypress-dotenv` — `.env` support · `allure-cypress` + Cypress Cloud reporting
- ESLint + `eslint-plugin-cypress` + Prettier enforced by Husky/lint-staged

## Prerequisites

- Node.js 20+ and npm
- (macOS only) if `ELECTRON_RUN_AS_NODE` is set globally, prefix commands with `env -u ELECTRON_RUN_AS_NODE`

## Setup

```bash
npm install
npx cypress install
cp .env.example .env   # fill in values; .env is gitignored
```

## Environment variables

| Variable             | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `CYPRESS_BASE_URL`   | Frontend URL (default `https://front.serverest.dev`) |
| `CYPRESS_API_URL`    | API URL (default `https://serverest.dev`)            |
| `CYPRESS_PROJECT_ID` | Cypress Cloud project id (recording)                 |
| `CYPRESS_RECORD_KEY` | Cypress Cloud record key (secret)                    |

## Running tests

```bash
npm run cy:open          # interactive mode
npm run cy:run           # full suite, Chrome headless
npm run cy:run:e2e       # frontend specs only
npm run cy:run:api       # API specs only

# filter by tag or test id (@cypress/grep)
npm run cy:run -- --env grepTags=@p0
npm run cy:run -- --env grep=FTC00003

# record to Cypress Cloud
npm run cy:record

# local Allure report (requires Java)
npm run allure:report && npx allure open allure-report
```

## Test inventory

| ID       | Type | Scenario                                           |
| -------- | ---- | -------------------------------------------------- |
| FTC00001 | E2E  | Register a new user via UI                         |
| FTC00002 | E2E  | Login via UI and see the catalog                   |
| FTC00003 | E2E  | Add product to the shopping list (name/price/qty)  |
| FTC00004 | API  | `POST /login` — token on success, 401 on bad creds |
| FTC00005 | API  | `/usuarios` full CRUD + duplicate email            |
| FTC00006 | API  | `/produtos` authenticated CRUD + 401 without token |

## Structure

```
cypress/
  e2e/frontend/        E2E specs (page objects)
  e2e/api/             API specs (service layer)
  support/
    pages/             Page Objects (screen-language commands)
    services/          API service objects
    factories/         faker data factories
    schemas/           JSON schemas for validation
    selectors/         data-testid selectors
    helpers/           session/auth helpers
.agents/skills/        onboarding skills for new joiners/AI agents
.github/workflows/     CI: merge + PR + nightly, artifacts, Cypress Cloud
```

## Conventions

- Tests are independent and repeatable — fixtures are created via API with unique data and cleaned up after each spec (shared public environment)
- `data-testid` selectors first; no `cy.wait(ms)`; no `force: true`
- Assertions check content/data, not just visibility
- Conventional commits; no AI-tool attribution in commit messages

## CI

`.github/workflows/cypress.yml` runs on merges to main, PRs and nightly (`0 3 * * *`). Results are recorded to Cypress Cloud and also uploaded as run artifacts (Allure report, screenshots, videos) as a fallback.
