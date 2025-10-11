import { Task, Wait } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';
import { Ensure } from '@serenity-js/assertions';
import { ConditionsUI } from '../targets/conditions.targets';
import { ClickOn } from '../interactions/clics.interactions';

export const ConfirmedConditions = () =>
    Task.where(`#actor acepta términos y condiciones`,
        
        Wait.until(ConditionsUI.titlePageConditions, isVisible()),
        Ensure.that(ConditionsUI.titlePageConditions, isVisible()), 
        ClickOn(ConditionsUI.buttonContinue, 'botón  Aceptar y continuar'),
    );

