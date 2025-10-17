import { Task, Wait, Duration } from "@serenity-js/core";
import { CheckSchedulesUI } from "../targets/check-schedules.targets";
import { Ensure, isGreaterThan, isTrue } from "@serenity-js/assertions";
import { isVisible } from '@serenity-js/web';
import { PlannedAgendasCount, HasPlannedAgendas } from "../questions/check-schedules.questions";

export const verifyPlannedSchedules = () =>
    Task.where(`#actor verifica que la cita se haya agendado correctamente`,

        Wait.upTo(Duration.ofSeconds(15)).until(CheckSchedulesUI.titleCheckSchedules, isVisible()),
        Ensure.that(CheckSchedulesUI.titleCheckSchedules, isVisible()),

        Wait.until(CheckSchedulesUI.quantitySchedules, isVisible()),
        Ensure.that(CheckSchedulesUI.quantitySchedules, isVisible()),

        Ensure.that(PlannedAgendasCount(), isGreaterThan(0)),
        Ensure.that(HasPlannedAgendas(), isTrue()),
    );