const { defineConfig } = require('cypress');
const dotenvPlugin = require('cypress-dotenv');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    expose: {
      apiUrl: process.env.CYPRESS_API_URL || 'https://serverest.dev',
    },
    env: {
      grepOmitFiltered: true,
      allure: true,
      allureResultsPath: 'allure-results',
    },
    setupNodeEvents(on, config) {
      config = dotenvPlugin(config, undefined, true);
      require('@cypress/grep/plugin').plugin(config);
      allureCypress(on, config, { resultsDir: 'allure-results' });
      return config;
    },
  },
});
