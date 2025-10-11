
import { test } from '@playwright/test';
import path from 'path';
import { Wait, Duration } from '@serenity-js/core';
import { Navigate, isVisible } from '@serenity-js/web';
import { Ensure } from '@serenity-js/assertions';
import { actorGenerico } from '../screenplay/actors/actorGenerico';
import { pickRandomContract } from '../utils/readCsv';
import { SelfScheduledUI } from '../screenplay/targets/self-scheduled.targets';
import { SchedulingUI } from '../screenplay/targets/scheduling.targets';
import { enterScheduleData } from '../screenplay/tasks/enter-data-schedule.task';
import { selectDateAndTimeScheduling } from '../screenplay/tasks/select-date-time-scheduling.task';
import { ConfirmedConditions } from '../screenplay/tasks/confirmed-conditions.task';
import { enterCodeOTP } from '../screenplay/tasks/enter-code-OTP.task';
import { PauseExecution } from '../screenplay/interactions/pause.interactions';
import { verifyPlannedSchedules } from '../screenplay/tasks/check-planned-schedules.task';

test('Actor navega a url e ingresa datos para agendar cita', async ({ browser }) => {

  const actor = actorGenerico(browser);
  const csvPath = path.resolve(__dirname, '../data/contracts.csv');
  const contractNumber = pickRandomContract(csvPath).Cuenta_Contrato;

  await actor.attemptsTo(

    Navigate.to('/public/self-scheduled?x=Technician'),

    Wait.for(Duration.ofSeconds(5)),
    Wait.until(SelfScheduledUI.titlePageMain, isVisible()),
    Ensure.that(SelfScheduledUI.titlePageMain, isVisible()),

    /*enterScheduleData(contractNumber),


    Wait.until(SchedulingUI.titlePageScheduling, isVisible()),
    Ensure.that(SchedulingUI.titlePageScheduling, isVisible()),

    selectDateAndTimeScheduling(),
    Wait.for(Duration.ofSeconds(5)),
    ConfirmedConditions(),
    Wait.for(Duration.ofSeconds(5)),
    enterCodeOTP(),
    Wait.for(Duration.ofSeconds(5)),
    verifyPlannedSchedules(),*/
    
  );

});

