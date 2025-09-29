
import { test } from '@playwright/test';
import path from 'path';
import { Wait, Duration } from '@serenity-js/core';
import { Navigate, Text, isVisible } from '@serenity-js/web';
import { Ensure, equals } from '@serenity-js/assertions';
import { actorGenerico } from '../screenplay/actors/actorGenerico';
import { SelfScheduledUI } from '../screenplay/targets/self-scheduled.targets';
import { enterScheduleData } from '../screenplay/tasks/enter-data-schedule';
import { pickRandomContract } from '../utils/readCsv';

test('Actor navega, valida título e ingresa datos con contrato desde CSV', async ({ browser }) => {

  const actor = actorGenerico(browser);
  const csvPath = path.resolve(__dirname, '../data/contracts.csv');
  const contractNumber = pickRandomContract(csvPath).Cuenta_Contrato;

  await actor.attemptsTo(    
    Wait.for(Duration.ofSeconds(2)),   
    Navigate.to('https://sm-backoffice-qa.vanti.tech/public/self-scheduled?x=Technician'),    
    Wait.until(SelfScheduledUI.titlePage, isVisible()),
    Ensure.that(SelfScheduledUI.titlePage, isVisible()),
    Ensure.that(Text.of(SelfScheduledUI.titlePage), equals('Ingresa los datos de cuenta')),   
    enterScheduleData(contractNumber),
  );
});

