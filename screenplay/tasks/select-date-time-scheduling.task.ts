import { Task, Wait, Duration } from '@serenity-js/core';
import { Click, isVisible, isClickable } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';
import { ClickRandomEnabledDate } from '../interactions/calendar.interactions';
import { SelectTime } from '../interactions/time.interactions';
import { SelectRandom } from '../interactions/selects.interactions';

export const selectDateAndTimeScheduling = () =>
  Task.where(`#actor selecciona operación y servicio (aleatorio), día y hora`,

    // --- Selección de operación ---
    Wait.until(SchedulingUI.selectorCustomerOperation, isVisible()),
    SelectRandom(SchedulingUI.selectorCustomerOperation),
    Ensure.that(SchedulingUI.triggerCustomerOperationText, isVisible()),

    // --- Selección de servicio ---
    Wait.until(SchedulingUI.selectorTypeService, isVisible()),
    SelectRandom(SchedulingUI.selectorTypeService),
    Ensure.that(SchedulingUI.triggerTypeServiceText, isVisible()),

    // --- Calendario ---
    Wait.until(SchedulingUI.titleCalendar, isVisible()),
    // ya garantizas visibilidad aquí, no hace falta Ensure de nuevo
    Wait.upTo(Duration.ofSeconds(15)).until(
      SchedulingUI.enabledDays.count(),
      isGreaterThan(0),
    ),

    // Scroll al primer día habilitado y selección aleatoria
    ClickRandomEnabledDate(),

    // --- Selección de horario ---
    SelectTime(),

    // --- Agendar cita ---
    Wait.until(SchedulingUI.buttonSchedule, isClickable()),
    Click.on(SchedulingUI.buttonSchedule),
  );


