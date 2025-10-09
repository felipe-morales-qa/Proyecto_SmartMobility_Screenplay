import { Task, Wait, Duration } from '@serenity-js/core';
import { Click, Scroll, isVisible, isClickable } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';
import { CheckEnabledDays, ClickRandomEnabledDate } from '../interactions/calendar.interactions';
import { CheckWorkingDay, SelectRandomWorkingDay } from '../interactions/time.interactions';
import { SelectRandom } from '../interactions/selects.interactions';

export const selectDateAndTimeScheduling = () =>
  Task.where(`#actor selecciona operación y servicio (aleatorio), día y hora`,

    // Selector Tipo de Operación
    Wait.until(SchedulingUI.selectorCustomerOperation, isVisible()),
    SelectRandom(SchedulingUI.selectorCustomerOperation),
    Ensure.that(SchedulingUI.triggerCustomerOperationText, isVisible()),

    // Selector Tipo de Servicio
    Wait.until(SchedulingUI.selectorTypeService, isVisible()),
    SelectRandom(SchedulingUI.selectorTypeService),
    Ensure.that(SchedulingUI.triggerTypeServiceText, isVisible()),

    // --- Calendario (con desplazamiento hasta los días) ---
    Wait.until(SchedulingUI.titleCalendar, isVisible()),
    Ensure.that(SchedulingUI.titleCalendar, isVisible()),
    

    // Esperar que el calendario renderice días habilitados
    Wait.upTo(Duration.ofSeconds(15)).until(
      SchedulingUI.enabledDays.count(),
      isGreaterThan(0)
    ),

    // Hacer scroll hasta el primer día habilitado
    Scroll.to(SchedulingUI.enabledDays.first()),

    // Validar visibilidad y seleccionar aleatoriamente
    Ensure.that(SchedulingUI.enabledDays.first(), isVisible()),
    ClickRandomEnabledDate(),


    // Horarios (esperar lista y elegir)
    Wait.upTo(Duration.ofSeconds(10)).until(
      SchedulingUI.workingDay.count(),
      isGreaterThan(0),
    ),

    CheckWorkingDay(),
    SelectRandomWorkingDay(),

    // Botón agendar
    Wait.until(SchedulingUI.buttonSchedule, isClickable()),
    Scroll.to(SchedulingUI.buttonSchedule),
    Click.on(SchedulingUI.buttonSchedule),
  );



