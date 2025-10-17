
import { By, PageElement, PageElements } from '@serenity-js/web';

export const SchedulingUI = {

    titlePageScheduling: PageElement.located(By.xpath('//h1[contains(@class,"font-extrabold") and contains(@class,"lg:text-2xl")]')),

    selectorCustomerOperation: PageElement.located(By.xpath('//mat-select[@formcontrolname="customerOperation"]')),

    selectorTypeService: PageElement.located(By.xpath('//mat-select[@formcontrolname="serviceSchedule"]')),

    triggerCustomerOperationText: PageElement.located(By.xpath('//mat-select[@formcontrolname="customerOperation"]//span[contains(@class,"mat-mdc-select-value-text")]')).describedAs('texto seleccionado en customerOperation'),

    triggerTypeServiceText: PageElement.located(By.xpath('//mat-select[@formcontrolname="serviceSchedule"]//span[contains(@class,"mat-mdc-select-value-text")]')).describedAs('texto seleccionado en tipo de servicio'),

    titleCalendar: PageElement.located(By.xpath('//span[@class="mdc-button__label"]')),

    calendarPanel: PageElement.located(By.xpath('//div[contains(@class,"mat-calendar-content")]')),

    enabledDays: PageElements.located(By.xpath('//table[contains(@class, "mat-calendar-table")]//button[contains(@class, "occupied-dates")]')),

    jornadaPanel: PageElement.located(By.xpath("(//div[contains(@class,'flex') and contains(@class,'flex-col') and contains(@class,'gap-2')])[2]")),

    workingDay: PageElements.located(By.xpath("//label[contains(@class,'radio-wrapper') and not(contains(@class,'disabled'))]")),

    workingDayText: PageElements.located(By.xpath("//label[contains(@class,'radio-wrapper')]//span")),

    buttonSchedule: PageElement.located(By.xpath('//button[@class="btn btn-primary w-full"]')),

}
