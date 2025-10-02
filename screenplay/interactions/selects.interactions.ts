
import { Interaction, Wait, Answerable } from '@serenity-js/core';
import { By, Click, PageElement, PageElements, Scroll, isVisible, Text } from '@serenity-js/web';
import { Ensure, isGreaterThan, not } from '@serenity-js/assertions';

export const SelectRandom = (
    selectTarget: Answerable<PageElement>,
) =>
    Interaction.where(`#actor abre el mat-select y elige una opción aleatoria`, async actor => {
        await Ensure.that(selectTarget, isVisible()).performAs(actor);
        await Scroll.to(selectTarget).performAs(actor);
        await Click.on(selectTarget).performAs(actor);

        const panel = PageElement.located(By.css('div.cdk-overlay-pane .mat-mdc-select-panel'));
        await Wait.until(panel, isVisible()).performAs(actor);

        const options = PageElements.located(
            By.css('div.cdk-overlay-pane .mat-mdc-select-panel mat-option:not([disabled])')
        );

        const total = await actor.answer(options.count());
        await Ensure.that(total, isGreaterThan(0)).performAs(actor);

        // filtra placeholders si hay
        const indicesValidos: number[] = [];
        for (let i = 0; i < total; i++) {
            const label = (await actor.answer(Text.of(options.nth(i)))).trim();
        }
        const pool = indicesValidos.length ? indicesValidos : [...Array(total).keys()];
        const idx = pool[Math.floor(Math.random() * pool.length)];

        const option = options.nth(idx);
        await Ensure.that(option, isVisible()).performAs(actor);
        await Scroll.to(option).performAs(actor);
        await Click.on(option).performAs(actor);

        await Wait.until(panel, not(isVisible())).performAs(actor);
    });
