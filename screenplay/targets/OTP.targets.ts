import { By, PageElement, PageElements } from '@serenity-js/web';

export const OTPUI = {

    titleInputOTP: PageElement.located(By.xpath('//h2[@id="modal-title"]')),
    buttonVerifyOTP: PageElement.located(By.xpath('//button[@class="btn btn-primary xs:w-full lg:w-40"]')),
};
