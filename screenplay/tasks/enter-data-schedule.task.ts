import { Task, Wait } from '@serenity-js/core';
import { Click, Enter, isVisible, Attribute } from '@serenity-js/web';
import { Ensure,  equals } from '@serenity-js/assertions';
import { SelfScheduledUI } from '../targets/self-scheduled.targets';
import { generateRandomPerson } from '../../utils/person_generator';
import { ClickOn } from '../interactions/clics.interactions';


export const enterScheduleData = (contractNumber: string) => {
    const persona = generateRandomPerson();

    return Task.where(`#actor ingresa los datos de cliente, selecciona quien atenderá la cita y continúa`,

        Wait.until(SelfScheduledUI.accountContract, isVisible()),         
        
        Enter.theValue(contractNumber).into(SelfScheduledUI.accountContract),
        Enter.theValue(persona.schedulingName).into(SelfScheduledUI.schedulingName),
        Enter.theValue(persona.schedulingPhone).into(SelfScheduledUI.schedulingPhone),
        Enter.theValue(persona.codeSap).into(SelfScheduledUI.technicalReferral),

        Ensure.that(SelfScheduledUI.attendantSelector, isVisible()),
        Click.on(SelfScheduledUI.attendantSelector),
        Click.on(SelfScheduledUI.attendantOptionOther),

        Enter.theValue(persona.attendantName).into(SelfScheduledUI.attendantName),
        Enter.theValue(persona.attendantPhone).into(SelfScheduledUI.attendantPhone),

        ClickOn(SelfScheduledUI.buttonContinue, 'botón Continuar'),

    );
};
