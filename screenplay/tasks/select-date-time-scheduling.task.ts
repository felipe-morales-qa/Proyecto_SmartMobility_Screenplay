import { Task, Wait, Duration } from '@serenity-js/core';
import { Click, isVisible, isClickable, ExecuteScript, Scroll } from '@serenity-js/web';
import { Ensure, isGreaterThan } from '@serenity-js/assertions';
import { SchedulingUI } from '../targets/scheduling.targets';
import { ClickRandomEnabledDate } from '../interactions/calendar.interactions';
import { SelectTime } from '../interactions/time.interactions';
import { SelectRandom } from '../interactions/selects.interactions';

export const selectDateAndTimeScheduling = () =>
  Task.where(`#actor selecciona operación, servicio, fecha y hora`,

    // --- Esperar a que cargue la página ---
    Wait.upTo(Duration.ofSeconds(30))
      .until(SchedulingUI.titlePageScheduling, isVisible()),

    // --- Selección de operación ---
    Wait.until(SchedulingUI.selectorCustomerOperation, isVisible()),
    SelectRandom(SchedulingUI.selectorCustomerOperation),
    Ensure.that(SchedulingUI.triggerCustomerOperationText, isVisible()),

    // --- Selección de servicio ---
    Wait.until(SchedulingUI.selectorTypeService, isVisible()),
    SelectRandom(SchedulingUI.selectorTypeService),
    Ensure.that(SchedulingUI.triggerTypeServiceText, isVisible()),

    // --- Desplazar hasta el calendario ---
    // 1️⃣ Scroll forzado para asegurar que el bloque del calendario sea visible
    ExecuteScript.sync(() => {
      const header = document.querySelector('.mat-mdc-calendar-header, .mat-calendar-header, .mat-calendar-controls');
      const y = header
        ? header.getBoundingClientRect().top + window.scrollY - 150 // offset configurable
        : window.scrollY + 700; // fallback
      window.scrollTo(0, y);
    }),

    // 2️⃣ Esperar que el título y los días se hayan renderizado
    Wait.upTo(Duration.ofSeconds(15))
      .until(SchedulingUI.titleCalendar, isVisible()),

    Wait.upTo(Duration.ofSeconds(20))
      .until(SchedulingUI.enabledDays.count(), isGreaterThan(0)),

    // --- Seleccionar día aleatorio (interacción reutilizable) ---
    ClickRandomEnabledDate(),

    // --- Selección de horario ---
    SelectTime(),

    // --- Confirmar agendamiento ---
    Wait.upTo(Duration.ofSeconds(15))
      .until(SchedulingUI.buttonSchedule, isClickable()),
    Click.on(SchedulingUI.buttonSchedule),
  );
