// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './TEST/2e2',
  timeout: 10000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3000', // adapte si besoin
    headless: true, 
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    timeout: 30000,
    reuseExistingServer: !process.env.CI, // en local, réutilise un serveur déjà lancé
  },
});
