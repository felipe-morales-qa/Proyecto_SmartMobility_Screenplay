import { Interaction } from '@serenity-js/core';

/**
 * Pausa la ejecución y espera a que el usuario presione ENTER para continuar.
 * Útil para ingresar manualmente un código OTP.
 */
export const PauseExecution = (mensaje = '👉 Ingrese el OTP y presione ENTER para continuar...') =>
  Interaction.where(`#actor pausa la ejecución manual`, async () => {
    console.log(`\n⏸️  ${mensaje}\n`);
    await new Promise<void>(resolve => {
      process.stdin.resume();
      process.stdin.once('data', () => resolve());
    });
  });