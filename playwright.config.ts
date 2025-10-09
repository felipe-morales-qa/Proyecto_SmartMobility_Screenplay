import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // 👇 Aquí defines TODOS los reporteros que quieres usar
  reporter: [
    // Reporter HTML nativo de Playwright (opcional)
    ['html', { open: process.env.PLAYWRIGHT_HTML_OPEN ?? 'never' }],

    // Reporter de Serenity/JS → genera el HTML narrativo
    ['@serenity-js/playwright-test', { output: 'target/site/serenity' }],

    // Reporter Serenity BDD → genera los archivos JSON del "journey"
    ['@serenity-js/serenity-bdd'],

    // Reporter de consola (para ver pasos en tiempo real)
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
