const cypress = require('eslint-plugin-cypress');
const prettier = require('eslint-config-prettier');

module.exports = [
  {
    ignores: [
      'node_modules',
      'allure-results',
      'allure-report',
      'cypress/screenshots',
      'cypress/videos',
    ],
  },
  cypress.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        Cypress: 'readonly',
        cy: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/no-force': 'error',
    },
  },
];
