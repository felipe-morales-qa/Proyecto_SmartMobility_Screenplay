import { Interaction, Wait, Duration } from '@serenity-js/core';
import { Click, Scroll, isVisible, isClickable, ExecuteScript } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';

/**
 * Desplaza el calendario (si está fuera del viewport)
 * y selecciona aleatoriamente un día habilitado.
 */
export const ClickRandomEnabledDate = () =>
  Interaction.where(`#actor selecciona aleatoriamente un día habilitado del calendario`, async actor => {

    // Esperar a que se rendericen los días
    await Wait.upTo(Duration.ofSeconds(20))
      .until(SchedulingUI.enabledDays.count(), isGreaterThan(0))
      .performAs(actor);

    const total = await actor.answer(SchedulingUI.enabledDays.count());
    await Ensure.that(total, isGreaterThan(0)).performAs(actor);

    // Scroll al primer día visible (para garantizar viewport)
    const firstDay = SchedulingUI.enabledDays.first();
    await Scroll.to(firstDay).performAs(actor);

    // Fallback: si sigue fuera de viewport, centramos manualmente
    await ExecuteScript.sync((el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!(r.bottom > 0 && r.top < vh)) {
        el.scrollIntoView({ block: 'center', inline: 'nearest' });
      }
    }).withArguments(firstDay).performAs(actor);

    // Seleccionar día aleatorio entre los habilitados
    const randomIndex = Math.floor(Math.random() * total);
    const randomDay = SchedulingUI.enabledDays.nth(randomIndex);

    // Asegurar visibilidad y clickabilidad
    await Scroll.to(randomDay).performAs(actor);
    await Wait.upTo(Duration.ofSeconds(10)).until(randomDay, isVisible()).performAs(actor);
    await Wait.upTo(Duration.ofSeconds(10)).until(randomDay, isClickable()).performAs(actor);

    await Click.on(randomDay).performAs(actor);
  });
