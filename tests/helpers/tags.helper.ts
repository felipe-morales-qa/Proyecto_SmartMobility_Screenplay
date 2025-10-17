import type { TestInfo } from '@playwright/test';

/**
 * Agrega uno o varios tags al test actual,
 * para que aparezcan como etiquetas en el reporte Serenity BDD.
 *
 * Ejemplo de uso:
 *   tag(testInfo, 'smoke', 'self-scheduled', 'module:scheduling');
 */
export function tag(testInfo: TestInfo, ...tags: string[]): void {
  tags.forEach(tagName => {
    testInfo.annotations.push({ type: 'tag', description: tagName });
  });
}