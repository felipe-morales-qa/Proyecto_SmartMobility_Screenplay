
import { By, PageElement, PageElements } from '@serenity-js/web';

export const SchedulingUI = {

    //titlePageScheduling: PageElement.located(By.xpath('//h1[contains(@class,"font-extrabold") and contains(@class,"lg:text-2xl")]')),

    selectorCustomerOperation: PageElement.located(By.xpath('//mat-select[@formcontrolname="customerOperation"]')),

    selectorTypeService: PageElement.located(By.xpath('//mat-select[@formcontrolname="serviceSchedule"]')),

    triggerCustomerOperationText: PageElement.located(By.xpath('//mat-select[@formcontrolname="customerOperation"]//span[contains(@class,"mat-mdc-select-value-text")]')).describedAs('texto seleccionado en customerOperation'),

    triggerTypeServiceText: PageElement.located(By.xpath('//mat-select[@formcontrolname="serviceSchedule"]//span[contains(@class,"mat-mdc-select-value-text")]')).describedAs('texto seleccionado en tipo de servicio'),

    titleCalendar: PageElement.located(By.xpath('//span[@class="mdc-button__label"]')),

    enabledDays: PageElements.located(By.xpath('//button[contains(@class, "occupied-dates")]')),

    workingDay: PageElements.located(By.xpath('//div[@class="flex flex-col gap-2"]//label//span')),

    buttonSchedule: PageElement.located(By.xpath('//button[@class="btn btn-primary w-full"]')),

}
