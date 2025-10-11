import { Task, Wait } from '@serenity-js/core';
import { OTPUI } from "../targets/OTP.targets";
import { isVisible } from '@serenity-js/web';
import { Ensure } from '@serenity-js/assertions';
import { ClickOn } from '../interactions/clics.interactions';

export const enterCodeOTP = () =>
    Task.where(`#actor ingresa el código OTP recibido por SMS`,

        Wait.until(OTPUI.titleInputOTP, isVisible()),
        Ensure.that(OTPUI.titleInputOTP, isVisible()),
        //Enter.theValue('123456').into(OTPUI.titleInputOTP),
        ClickOn(OTPUI.buttonVerifyOTP, 'botón continuar'),
    );