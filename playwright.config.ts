import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',  
  timeout: 120_000,                 // 120s por test
  expect: { timeout: 15_000 },      // 15s para asserts nativos (si usas expect)
  // ...

  reporter: [
    ['@serenity-js/playwright-test', {
      crew: [
        '@serenity-js/console-reporter',
        '@serenity-js/serenity-bdd',
        // ✅ Usa el Photographer correcto desde @serenity-js/web
        //['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' }],
        // Alternativas:
        ['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfInteractions' }],
        // ['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfActivities' }],
      ],
    }],
    ['html', { open: process.env.PLAYWRIGHT_HTML_OPEN ?? 'never' }],
  ],

  use: {
    headless: false,
    viewport: null,
    trace: 'retain-on-failure',
    screenshot: 'off',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'qa',   use: { baseURL: 'https://sm-backoffice-qa.vanti.tech',  launchOptions: { args: ['--start-maximized'] } } },
    { name: 'dev',  use: { baseURL: 'https://sm-backoffice-dev.vanti.tech', launchOptions: { args: ['--start-maximized'] } } },
    { name: 'prod', use: { baseURL: 'https://miagenda.grupovanti.com',      launchOptions: { args: ['--start-maximized'] } } },
  ], 

});

