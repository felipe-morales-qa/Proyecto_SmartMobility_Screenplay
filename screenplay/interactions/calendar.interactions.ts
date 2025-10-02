
import { Interaction, Task } from '@serenity-js/core';
import { Click, Scroll } from '@serenity-js/web';
import { Ensure } from '@serenity-js/assertions';
import { isVisible } from '@serenity-js/web';
import { isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';

export const CheckEnabledDays = () =>
    Task.where(`#actor verifica que existe al menos un día habilitado`,
        Ensure.that(SchedulingUI.enabledDays.count(), isGreaterThan(0)),
        Ensure.that(SchedulingUI.enabledDays.first(), isVisible()),
    );

export const ClickRandomEnabledDate = () =>
    Interaction.where(`#actor hace click en una fecha habilitada aleatoria`, async actor => {
        const count = await actor.answer(SchedulingUI.enabledDays.count());
        if (count === 0) throw new Error('No hay fechas habilitadas');

        const idx = Math.floor(Math.random() * count);
        const target = SchedulingUI.enabledDays.nth(idx);

        await Ensure.that(target, isVisible()).performAs(actor);
        await Scroll.to(target).performAs(actor);
        await Click.on(target).performAs(actor);
    });

export const CheckWorkingDay = () =>
    Task.where(`#actor verifica que existen horarios disponibles`,
        Ensure.that(SchedulingUI.workingDay.count(), isGreaterThan(0)),
        Ensure.that(SchedulingUI.workingDay.first(), isVisible()),
    );

export const SelectRandomWorkingDay = () =>
    Interaction.where(`#actor selecciona un horario disponible aleatorio`, async actor => {
        const total = await actor.answer(SchedulingUI.workingDay.count());
        if (total === 0) throw new Error('No hay horarios disponibles');

        const idx = Math.floor(Math.random() * total);
        const option = SchedulingUI.workingDay.nth(idx);

        await Ensure.that(option, isVisible()).performAs(actor);
        await Scroll.to(option).performAs(actor);
        await Click.on(option).performAs(actor);
    });
