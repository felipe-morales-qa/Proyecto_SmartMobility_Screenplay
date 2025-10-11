import { Task, Wait, Duration } from '@serenity-js/core';
import { Scroll, Click, isVisible, isClickable } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';
import { Interaction } from '@serenity-js/core';

/**
 * Verifica que existan jornadas disponibles.
 * Asegura que haya al menos una jornada visible en el panel.
 */
export const CheckWorkingDay = () =>
  Task.where(
    `#actor verifica que existen horarios disponibles`,
    Ensure.that(SchedulingUI.workingDay.count(), isGreaterThan(0)),
    Ensure.that(SchedulingUI.workingDay.first(), isVisible()),
  );

/**
 * Selecciona aleatoriamente una jornada disponible (AM/PM).
 * Espera visibilidad, genera un índice aleatorio y hace clic.
 */
export const SelectRandomWorkingDay = () =>
  Interaction.where(`#actor selecciona una jornada aleatoria`, async actor => {
    const total = await actor.answer(SchedulingUI.workingDay.count());
    if (total === 0) throw new Error('No hay horarios disponibles');

    const first = SchedulingUI.workingDay.first();
    await Scroll.to(first).performAs(actor);
    await Ensure.that(first, isVisible()).performAs(actor);

    const idx = Math.floor(Math.random() * total);
    const option = SchedulingUI.workingDay.nth(idx);

    await Ensure.that(option, isVisible()).performAs(actor);
    await Ensure.that(option, isClickable()).performAs(actor);
    await Scroll.to(option).performAs(actor);
    await Click.on(option).performAs(actor);
  });

/**
 * Orquesta el flujo de selección de jornada.
 * Espera el panel, valida disponibilidad y selecciona una aleatoria.
 */
export const SelectTime = () =>
  Task.where(`#actor selecciona una jornada`,
    // Ancla de aparición del módulo de jornadas
    Wait.until(SchedulingUI.jornadaPanel, isVisible()),

    // Espera a que realmente existan opciones
    Wait.upTo(Duration.ofSeconds(10)).until(
      SchedulingUI.workingDay.count(),
      isGreaterThan(0),
    ),
    
    CheckWorkingDay(),    
    SelectRandomWorkingDay(),
  );

