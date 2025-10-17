import { Task, Wait, Duration } from '@serenity-js/core';
import { Click, isVisible, isClickable } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { OTPUI } from '../targets/OTP.targets';
import { FillOtpFromString } from '../interactions/fill-otp.interaction';

export const enterCodeOTP = (rawOtpCode: string): Task =>
  Task.where(
    `#actor ingresa el código OTP recibido por SMS`,

    // 1) Modal/encabezado visible
    Wait.upTo(Duration.ofSeconds(20)).until(OTPUI.titleInputOTP, isVisible()),
    Ensure.that(OTPUI.titleInputOTP, isVisible()),

    // 2) Inputs presentes
    Wait.upTo(Duration.ofSeconds(20)).until(OTPUI.allOtpInputs.count(), isGreaterThan(0)),

    // 3) Completar OTP (pegar todo → fallback dígito a dígito)
    FillOtpFromString(rawOtpCode),

    // 4) Verificar/continuar
    Wait.upTo(Duration.ofSeconds(10)).until(OTPUI.buttonVerifyOTP, isClickable()),
    Click.on(OTPUI.buttonVerifyOTP),
  );
