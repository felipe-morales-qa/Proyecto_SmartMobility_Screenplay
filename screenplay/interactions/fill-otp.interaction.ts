import { Interaction } from '@serenity-js/core';
import { ExecuteScript, Scroll, Click, Attribute } from '@serenity-js/web';
import { OTPUI } from '../targets/OTP.targets';

export const FillOtpFromString = (rawOtpCode: string) =>
  Interaction.where(`#actor completa el código OTP`, async actor => {
    const otp = (rawOtpCode || '').replace(/\s+/g, '');

    // 1) Intento A: pegar todo en el primer input (autodistribución si el widget lo soporta)
    await Scroll.to(OTPUI.firstOtpInput).performAs(actor);
    await Click.on(OTPUI.firstOtpInput).performAs(actor);

    await ExecuteScript.sync((el: HTMLInputElement, code: string) => {
      el.focus();
      el.value = '';
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.value = code;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }).withArguments(OTPUI.firstOtpInput, otp).performAs(actor);

    // 2) ¿El botón quedó habilitado? Si no, fallback B: rellenar input por input
    const disabledAttr = await actor.answer(Attribute.called('disabled').of(OTPUI.buttonVerifyOTP));
    const ariaDisabled = await actor.answer(Attribute.called('aria-disabled').of(OTPUI.buttonVerifyOTP));
    const isEnabled = (disabledAttr === null || disabledAttr === undefined) && ariaDisabled !== 'true';
    if (isEnabled) return;

    // Fallback: escribir carácter por carácter en cada input
    await ExecuteScript.sync((inputs: HTMLInputElement[], code: string) => {
      const chars = code.split('');
      const n = Math.min(inputs.length, chars.length);
      for (let i = 0; i < n; i++) {
        const input = inputs[i];
        const ch = chars[i] ?? '';
        input.focus();
        input.value = '';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.value = ch;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }).withArguments(OTPUI.allOtpInputs, otp).performAs(actor);
  });
