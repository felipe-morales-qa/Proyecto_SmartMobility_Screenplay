import { Question } from '@serenity-js/core';
import { Text } from '@serenity-js/web';
import { CheckSchedulesUI } from '../targets/check-schedules.targets';

/** Devuelve el número del badge "agendas previstas" (0 si no parsea). */
export const PlannedAgendasCount = () =>
  Question.about<number>('número de agendas previstas', async actor => {
    const raw = await Text.of(CheckSchedulesUI.quantitySchedules).answeredBy(actor);
    const n = parseInt(raw.trim(), 10);
    return Number.isFinite(n) ? n : 0;
  });

/** Indica si hay al menos una agenda prevista. */
export const HasPlannedAgendas = () =>
  Question.about<boolean>('si tiene agendas previstas', async actor =>
    (await PlannedAgendasCount().answeredBy(actor)) > 0
  );