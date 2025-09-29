import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [
    ['html', { open: process.env.PLAYWRIGHT_HTML_OPEN ?? 'never' }],
    ['@serenity-js/serenity-bdd'],
    ['@serenity-js/console-reporter'],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://sm-backoffice-qa.vanti.tech', 
    headless: (process.env.HEADLESS ?? 'true') === 'true',                  
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
