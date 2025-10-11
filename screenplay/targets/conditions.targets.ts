import { By, PageElement, PageElements } from '@serenity-js/web';

export const ConditionsUI = {

    titlePageConditions: PageElement.located(By.xpath('//h2[contains(@class,"text-lg") and contains(@class,"font-bold")]')),
    buttonContinue: PageElement.located(By.xpath('//button[@class="btn btn-primary xs:w-full lg:w-72"]')),

}