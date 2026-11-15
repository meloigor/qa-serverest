# Skill: Explore flows with MCP browser tools before writing Cypress code

Before automating a UI scenario, validate the real flow with a browser MCP server (chrome-devtools or playwright). This prevents guessing selectors and asserting on behavior that doesn't exist.

## When to use

- Before writing any new E2E spec
- When a test fails and you suspect the app behavior changed
- When documenting a `data-testid` gap

## Typical loop (chrome-devtools MCP)

1. `new_page` → open the target URL (e.g. https://front.serverest.dev)
2. `take_snapshot` → get element uids and page structure
3. `fill_form` / `click` → drive the flow
4. `evaluate_script` → inspect the DOM when you need detail:
   - List all test ids: `Array.from(document.querySelectorAll('[data-testid]')).map(e => e.getAttribute('data-testid'))`
   - Check localStorage keys the app uses (the app stores `serverest/userToken`, `serverest/userNome`, `serverest/userEmail`)
   - Read `document.body.innerText` to see real messages
5. `list_network_requests` → confirm which API calls the UI makes (method, path, payload) so API fixtures match reality
6. Note snapshot uids go stale after navigation — re-snapshot.

## What to capture for the spec

- `data-testid` values (or gaps where they're missing — document the fallback)
- Exact user-facing texts (alerts, labels, messages) for assertions
- Real navigation targets (e.g. registering auto-logs-in to `/home`; `/carrinho` is under construction — use `/minhaListaDeProdutos`)
- API endpoints the UI calls, to mirror in service objects
