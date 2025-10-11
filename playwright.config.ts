import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
    ['html', { open: process.env.PLAYWRIGHT_HTML_OPEN ?? 'never' }],
    ['@serenity-js/playwright-test', { output: 'target/site/serenity' }],
    ['@serenity-js/serenity-bdd'],
    ['@serenity-js/console-reporter'],
  ],

  use: {
    headless: false,
    viewport: null,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'qa',
      use: {
        baseURL: 'https://sm-backoffice-qa.vanti.tech',
        launchOptions: { args: ['--start-maximized'] },
      },
    },
    {
      name: 'dev',
      use: {
        baseURL: 'https://sm-backoffice-dev.vanti.tech',
        launchOptions: { args: ['--start-maximized'] },
      },
    },
    {
      name: 'prod',
      use: {
        baseURL: 'https://miagenda.grupovanti.com',
        launchOptions: { args: ['--start-maximized'] },
      },
    },

  //Canales reales / navegadores específicos 

  // // QA en Chrome estable
  // {
  //   name: 'chrome-qa',
  //   use: {
  //     channel: 'chrome',
  //     baseURL: 'https://sm-backoffice-qa.vanti.tech',
  //     viewport: null,
  //     launchOptions: { args: ['--start-maximized'] },
  //   },
  // },

  // // QA en Microsoft Edge estable
  // {
  //   name: 'msedge-qa',
  //   use: {
  //     channel: 'msedge',
  //     baseURL: 'https://sm-backoffice-qa.vanti.tech',
  //     viewport: null,
  //     launchOptions: { args: ['--start-maximized'] },
  //   },
  // },

  // // QA en Firefox
  // // (Firefox no usa "channel"; se especifica con browserName)
  // {
  //   name: 'firefox-qa',
  //   use: {
  //     browserName: 'firefox',
  //     baseURL: 'https://sm-backoffice-qa.vanti.tech',
  //     viewport: null,
  //     launchOptions: { args: ['--start-maximized'] },
  //   },
  // },

  // // DEV en Chrome
  // {
  //   name: 'chrome-dev',
  //   use: {
  //     channel: 'chrome',
  //     baseURL: 'https://sm-backoffice-dev.vanti.tech',
  //     viewport: null,
  //     launchOptions: { args: ['--start-maximized'] },
  //   },
  // },

  // // PROD en Chrome (recomendado solo para smokes/lectura)
  // {
  //   name: 'chrome-prod',
  //   use: {
  //     channel: 'chrome',
  //     baseURL: 'https://miagenda.grupovanti.com',
  //     viewport: null,
  //     launchOptions: { args: ['--start-maximized'] },
  //   },
  // },

  ],
});

