# qa-serverest

Suíte de testes automatizados para o [ServeRest](https://serverest.dev) — 3 cenários E2E no [frontend](https://front.serverest.dev) e 3 cenários de API, construída com Cypress + JavaScript.

## Stack

- **Cypress 16** (Chrome headless) com testes de API via `cy.request`
- **Page Object Model** para E2E · service objects + factories para API
- `@faker-js/faker` — dados de teste aleatórios
- `cypress-network-idle` — sem waits explícitos
- `cypress-plugin-steps` — steps numerados estilo gherkin no log
- `cypress-schema-validator` — validação de schema JSON nas respostas da API
- `@cypress/grep` — seleção de testes por tag (`@p0`, `@e2e`, `@api`, ...)
- `cypress-dotenv` — suporte a `.env` · `allure-cypress` + Cypress Cloud
- ESLint + `eslint-plugin-cypress` + Prettier com Husky/lint-staged

## Pré-requisitos

- Node.js 20+ e npm
- (somente macOS) se `ELECTRON_RUN_AS_NODE` estiver definido globalmente, prefixe os comandos com `env -u ELECTRON_RUN_AS_NODE`

## Instalação

```bash
npm install
npx cypress install
cp .env.example .env   # preencha os valores; .env está no .gitignore
```

## Variáveis de ambiente

| Variável             | Finalidade                                             |
| -------------------- | ------------------------------------------------------ |
| `CYPRESS_BASE_URL`   | URL do frontend (padrão `https://front.serverest.dev`) |
| `CYPRESS_API_URL`    | URL da API (padrão `https://serverest.dev`)            |
| `CYPRESS_PROJECT_ID` | ID do projeto no Cypress Cloud                         |
| `CYPRESS_RECORD_KEY` | Chave de gravação do Cypress Cloud (segredo)           |

## Executando os testes

```bash
npm run cy:open          # modo interativo
npm run cy:run           # suíte completa, Chrome headless
npm run cy:run:e2e       # apenas specs de frontend
npm run cy:run:api       # apenas specs de API

# filtrar por tag ou ID de teste (@cypress/grep)
npm run cy:run -- --env grepTags=@p0
npm run cy:run -- --env grep=FTC00003

# gravar no Cypress Cloud
npm run cy:record

# relatório Allure local (requer Java)
npm run allure:report && npx allure open allure-report
```

## Inventário de testes

| ID       | Tipo | Cenário                                                        |
| -------- | ---- | -------------------------------------------------------------- |
| FTC00001 | E2E  | Cadastro de novo usuário pela UI                               |
| FTC00002 | E2E  | Login pela UI e visualização do catálogo                       |
| FTC00003 | E2E  | Adicionar produto à lista de compras (nome/preço/qtd)          |
| FTC00004 | API  | `POST /login` — token no sucesso, 401 em credenciais inválidas |
| FTC00005 | API  | `/usuarios` CRUD completo + e-mail duplicado                   |
| FTC00006 | API  | `/produtos` CRUD autenticado + 401 sem token                   |

## Estrutura

```
cypress/
  e2e/frontend/        specs E2E (page objects)
  e2e/api/             specs de API (service layer)
  support/
    pages/             Page Objects
    services/          service objects da API
    factories/         factories com faker
    schemas/           schemas JSON para validação
    selectors/         seletores data-testid
    helpers/           helpers de sessão/autenticação
.agents/skills/        skills de onboarding para novos membros/agentes de IA
.github/workflows/     CI: merge + PR + nightly, artefatos, Cypress Cloud
```

## Convenções

- Testes independentes e repetíveis — fixtures criadas via API com dados únicos e removidas após cada spec (ambiente público compartilhado)
- Seletores `data-testid` primeiro; sem `cy.wait(ms)`; sem `force: true`
- Asserções verificam conteúdo/dados, não apenas visibilidade
- Commits convencionais; sem menção a ferramentas de IA

## CI

`.github/workflows/cypress.yml` executa em merges na main, PRs e diariamente às 3h UTC (`0 3 * * *`). Resultados são gravados no Cypress Cloud e também enviados como artefatos do run (relatório Allure, screenshots, vídeos) como fallback.
