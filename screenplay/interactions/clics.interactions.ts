import { Interaction } from '@serenity-js/core';
import { Click, Scroll, isClickable } from '@serenity-js/web';
import { Ensure } from '@serenity-js/assertions';

/**
 * Hace clic en un target asegurando que esté visible y clicable.
 */
export const ClickOn = (target: any, description: string) =>
  Interaction.where(`#actor hace clic en ${description}`, async actor => {
    await Ensure.that(target, isClickable()).performAs(actor);
    await Scroll.to(target).performAs(actor);
    await Click.on(target).performAs(actor);
  });
