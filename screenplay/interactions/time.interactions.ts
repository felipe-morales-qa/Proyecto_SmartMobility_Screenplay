import { Interaction, Task, Wait } from '@serenity-js/core';
import { Click, Scroll, isVisible } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';

// Verifica que haya horarios disponibles
export const CheckWorkingDay = () =>
  Task.where(
    `#actor verifica que existen horarios disponibles`,
    Ensure.that(SchedulingUI.workingDay.count(), isGreaterThan(0)),
    Ensure.that(SchedulingUI.workingDay.first(), isVisible()),
  );

// Selecciona un horario aleatorio
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

// Composición de “seleccionar horario”
export const SelectTime = () =>
  Task.where(`#actor selecciona un horario`,
    Wait.until(SchedulingUI.workingDay.first(), isVisible()),
    CheckWorkingDay(),
    SelectRandomWorkingDay(),
  );
