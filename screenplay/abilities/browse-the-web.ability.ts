import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import type { Browser } from '@playwright/test';

export const UseBrowseTheWeb = (browser: Browser) =>
  BrowseTheWebWithPlaywright.using(browser);