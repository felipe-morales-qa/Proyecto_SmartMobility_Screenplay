import { Interaction, Wait, Duration  } from '@serenity-js/core';
import { Click, Scroll, isVisible } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';

/**
 * Selecciona una fecha habilitada aleatoria en el calendario.
 * Antes de hacer clic, se asegura de que existan días habilitados
 * y realiza scroll hasta el primer día visible del calendario.
 */
export const ClickRandomEnabledDate = () =>
  Interaction.where(`#actor desplaza el calendario y selecciona una fecha habilitada aleatoria`, async (actor) => {

    // Esperar que el calendario tenga días habilitados renderizados
    await Wait.upTo(Duration.ofSeconds(15)).until(
      SchedulingUI.enabledDays.count(),
      isGreaterThan(0),
    );

    // Obtener total de días habilitados
    const total = await actor.answer(SchedulingUI.enabledDays.count());
    await Ensure.that(total, isGreaterThan(0)).performAs(actor);

    // Scroll automático al primer día habilitado
    const firstDay = SchedulingUI.enabledDays.first();
    await Scroll.to(firstDay).performAs(actor);
    await Ensure.that(firstDay, isVisible()).performAs(actor);

    // Seleccionar un día aleatorio entre los habilitados
    const randomIndex = Math.floor(Math.random() * total);
    const randomDay = SchedulingUI.enabledDays.nth(randomIndex);

    // Verificar visibilidad y hacer clic
    await Ensure.that(randomDay, isVisible()).performAs(actor);
    await Scroll.to(randomDay).performAs(actor);
    await Click.on(randomDay).performAs(actor);
  });
