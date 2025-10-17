import { test } from '@playwright/test';
import path from 'path';
import { Navigate } from '@serenity-js/web';
import { pickRandomContract } from '../utils/readCsv';
import { actorQA } from '../screenplay/actors/actorQA';
import { enterScheduleData } from '../screenplay/tasks/enter-data-schedule.task';
import { selectDateAndTimeScheduling } from '../screenplay/tasks/select-date-time-scheduling.task';
import { ConfirmedConditions } from '../screenplay/tasks/confirmed-conditions.task';
import { enterCodeOTP } from '../screenplay/tasks/enter-code-OTP.task';
import { verifyPlannedSchedules } from '../screenplay/tasks/check-planned-schedules.task';
import { tag } from './helpers/tags.helper';

test.describe('Epic: Mi Agenda', () => {
  test.describe('Feature: Agendamiento', () => {

    test('Scenario: Usuario realiza agendamiento de una visita', async ({ browser }, testInfo) => {

      //Tags
      tag(testInfo,
        'Tipo de prueba: smoke',
        'Contexto funcional: Auto-agendamiento',
        'Modulo: Gestión de Agendamientos',
        'Entorno de ejecución: qa'
      );

      const actor = actorQA(browser);
      const csvPath = path.resolve(process.cwd(), 'data', 'contracts.csv');
      const record = pickRandomContract(csvPath);
      const contractNumber = String(record.Cuenta_Contrato ?? '').trim();

      await actor.attemptsTo(
        Navigate.to('/public/self-scheduled?x=Technician'),
        enterScheduleData(contractNumber),
        selectDateAndTimeScheduling(),
        ConfirmedConditions(),
        enterCodeOTP('444222'),
        verifyPlannedSchedules(),
      );
    });
  });
});
