const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'always' }],
  ],

  use: {
    baseURL: 'http://127.0.0.1:3000',
    headless: true,
  },

  webServer: {
    command: 'npx http-server "./Todo List App" -p 3000',
    port: 3000,
    timeout: 120 * 1000, 
    reuseExistingServer: true,
  },
});
