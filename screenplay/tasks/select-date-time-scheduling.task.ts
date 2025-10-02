import { Task, Wait } from '@serenity-js/core';
import { Click, Scroll, isVisible, isClickable } from '@serenity-js/web';
import { Ensure } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';
import { CheckEnabledDays, ClickRandomEnabledDate, CheckWorkingDay, SelectRandomWorkingDay } from '../interactions/calendar.interactions';
import { SelectRandom } from '../interactions/selects.interactions';

export const selectDateAndTimeScheduling = () =>
  Task.where(`#actor selecciona operación y servicio (aleatorio), día y hora`,

    // Selector customerOperation
    Wait.until(SchedulingUI.selectorCustomerOperation, isVisible()),
    SelectRandom(SchedulingUI.selectorCustomerOperation),
    Ensure.that(SchedulingUI.triggerCustomerOperationText, isVisible()),

    // Selector typeService
    Wait.until(SchedulingUI.selectorTypeService, isVisible()),
    SelectRandom(SchedulingUI.selectorTypeService),
    Ensure.that(SchedulingUI.triggerTypeServiceText, isVisible()),

    // Calendario
    Wait.until(SchedulingUI.enabledDays.first(), isVisible()),
    CheckEnabledDays(),
    ClickRandomEnabledDate(),


    // Selector horario
    Wait.until(SchedulingUI.workingDay.first(), isVisible()),
    CheckWorkingDay(),
    SelectRandomWorkingDay(),

    // Botón agendar
    Wait.until(SchedulingUI.buttonSchedule, isClickable()),
    Scroll.to(SchedulingUI.buttonSchedule),
    Click.on(SchedulingUI.buttonSchedule),
  
  );


  
