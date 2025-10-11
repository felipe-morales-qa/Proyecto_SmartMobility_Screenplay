
import { By, PageElement, PageElements } from '@serenity-js/web';

export const SelfScheduledUI = {
  
  titlePageMain: PageElement.located(By.xpath('//h1[normalize-space(.)="Ingresa los datos de cuenta"]')),

  
  accountContract: PageElement.located(By.xpath('//input[@formcontrolname="account_contract"]')),
  schedulingName: PageElement.located(By.xpath('//input[@formcontrolname="scheduling_name"]')),
  schedulingPhone: PageElement.located(By.xpath('//input[@formcontrolname="scheduling_phone"]')),
  technicalReferral: PageElement.located(By.xpath('//input[@formcontrolname="technical_referral"]')),

 
  attendantSelector: PageElement.located(By.xpath('//div[@class="mat-mdc-select-value"]')), 
  attendantOptionOther: PageElement.located(By.xpath('//div[contains(@class,"cdk-overlay-pane")]//mat-option//span[normalize-space(.)="Otra persona"]')),  
  attendantName: PageElement.located(By.xpath('//input[@formcontrolname="attendant_name"]')),
  attendantPhone: PageElement.located(By.xpath('//input[@formcontrolname="attendant_phone"]')),

  
  buttonContinue: PageElement.located(By.xpath('//button[@class="btn btn-primary min-w-72"]')).describedAs('botón Continuar'),

  
  nextPageTitle: PageElement.located(By.xpath('//h1[contains(@class,"font-extrabold") and contains(@class,"lg:text-2xl")]')),
};
