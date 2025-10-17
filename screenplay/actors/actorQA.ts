import { actorCalled } from '@serenity-js/core';
import type { Browser } from '@playwright/test';
import { UseBrowseTheWeb } from '../abilities/browse-the-web.ability';

export function actorQA(browser: Browser) {
  return actorCalled('QA').whoCan(
    UseBrowseTheWeb(browser)
  );
}