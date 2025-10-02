import { Task, Wait, Duration } from '@serenity-js/core';
import { Click, Scroll, Enter, isVisible, isClickable } from '@serenity-js/web';
import { Ensure } from '@serenity-js/assertions';
import { SelfScheduledUI } from '../targets/self-scheduled.targets';
import { generarPersonaAleatoria } from '../../utils/person_generator';

export const enterScheduleData = (contractNumber: string) => {
    const persona = generarPersonaAleatoria();

    return Task.where(`#actor ingresa los datos de cliente, selecciona quien atenderá la cita y continúa`,
        
        Enter.theValue(contractNumber).into(SelfScheduledUI.accountContract),
        Enter.theValue(persona.schedulingName).into(SelfScheduledUI.schedulingName),
        Enter.theValue(persona.schedulingPhone).into(SelfScheduledUI.schedulingPhone),
        Enter.theValue(persona.codeSap).into(SelfScheduledUI.technicalReferral),

        Ensure.that(SelfScheduledUI.attendantSelector, isVisible()),
        Click.on(SelfScheduledUI.attendantSelector),
        Click.on(SelfScheduledUI.attendantOptionOther),        
        
        Enter.theValue(persona.attendantName).into(SelfScheduledUI.attendantName),
        Enter.theValue(persona.attendantPhone).into(SelfScheduledUI.attendantPhone),

        
        Wait.upTo(Duration.ofSeconds(10)).until(SelfScheduledUI.buttonContinue, isClickable()),
        Scroll.to(SelfScheduledUI.buttonContinue),
        Click.on(SelfScheduledUI.buttonContinue),

        Wait.until(SelfScheduledUI.nextPageTitle, isVisible()),
        Ensure.that(SelfScheduledUI.nextPageTitle, isVisible()),
        
    );
};
