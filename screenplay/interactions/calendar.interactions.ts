import { Interaction, Task } from '@serenity-js/core';
import { Click, Scroll, isVisible } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';

/** Verifica que haya al menos una fecha habilitada */
export const CheckEnabledDays = () =>
  Task.where(
    `#actor verifica que existe al menos un día habilitado`,
    Ensure.that(SchedulingUI.enabledDays.count(), isGreaterThan(0)),
    Ensure.that(SchedulingUI.enabledDays.first(), isVisible()),
  );

/** Selecciona una fecha habilitada aleatoria */
export const ClickRandomEnabledDate = () =>
  Interaction.where(`#actor selecciona una fecha habilitada aleatoria`, async actor => {
    const total = await actor.answer(SchedulingUI.enabledDays.count());
    if (total === 0) throw new Error('No hay fechas habilitadas en el calendario');

    const idx = Math.floor(Math.random() * total);
    const target = SchedulingUI.enabledDays.nth(idx);

    await Ensure.that(target, isVisible()).performAs(actor);
    await Scroll.to(target).performAs(actor);
    await Click.on(target).performAs(actor);
  });

/** Seleccionar fecha (robusto) */
export const SelectDate = () =>
  Task.where(`#actor selecciona una fecha`,
    // ✅ primero garantizamos que el calendario está visible (si tienes el target):
    Ensure.that(SchedulingUI.titleCalendar, isVisible()),
    Scroll.to(SchedulingUI.titleCalendar),

    // ✅ luego validamos que HAYA fechas (no esperamos al first() todavía)
    Ensure.that(SchedulingUI.enabledDays.count(), isGreaterThan(0)),

    // ✅ y ya seleccionamos una aleatoria (la interacción hace Scroll + Click)
    ClickRandomEnabledDate(),
  );
