import { By, PageElement, PageElements } from '@serenity-js/web';

export const CheckSchedulesUI = {

    titleCheckSchedules: PageElement.located(By.xpath('//h1[contains(@class,"font-extrabold") and contains(@class,"text-2xl")]')),

    quantitySchedules: PageElement.located(By.xpath('//span[contains(@class,"bg-primary") and contains(@class,"rounded-full")]')),
    
};
