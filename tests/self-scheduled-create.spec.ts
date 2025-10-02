
import { test } from '@playwright/test';
import path from 'path';
import { Wait, Duration } from '@serenity-js/core';
import { Navigate, isVisible } from '@serenity-js/web';
import { Ensure } from '@serenity-js/assertions';
import { actorGenerico } from '../screenplay/actors/actorGenerico';
import { SelfScheduledUI } from '../screenplay/targets/self-scheduled.targets';
import { enterScheduleData } from '../screenplay/tasks/enter-data-schedule.task';
import { selectDateAndTimeScheduling } from '../screenplay/tasks/select-date-time-scheduling.task';
import { pickRandomContract } from '../utils/readCsv';

test('Actor navega, valida título e ingresa datos con contrato desde CSV', async ({ browser }) => {

  const actor = actorGenerico(browser);
  const csvPath = path.resolve(__dirname, '../data/contracts.csv');
  const contractNumber = pickRandomContract(csvPath).Cuenta_Contrato;

  await actor.attemptsTo(    
    
      
    Navigate.to('https://sm-backoffice-qa.vanti.tech/public/self-scheduled?x=Technician'),

    Wait.for(Duration.ofSeconds(5)),
    Wait.until(SelfScheduledUI.titlePage, isVisible()),
    Ensure.that(SelfScheduledUI.titlePage, isVisible()),
    
    enterScheduleData(contractNumber),

    
    Wait.until(SelfScheduledUI.nextPageTitle, isVisible()),
    Ensure.that(SelfScheduledUI.nextPageTitle, isVisible()),


    selectDateAndTimeScheduling(),
  );
});

