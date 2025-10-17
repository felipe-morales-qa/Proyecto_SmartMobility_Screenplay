import { By, PageElement, PageElements } from '@serenity-js/web';

export const OTPUI = {
  titleInputOTP: PageElement.located(By.xpath('//h2[@id="modal-title"]')),
  // primer input (lo mantengo por conveniencia)
  firstOtpInput: PageElement.located(By.xpath('(//input[@aria-label="Código OTP"])[1]')),
  // colección de inputs OTP
  allOtpInputs: PageElements.located(By.xpath('//input[@aria-label="Código OTP"]')),
  // botón verificar
  buttonVerifyOTP: PageElement.located(By.xpath('//button[@class="btn btn-primary xs:w-full lg:w-40"]')),
};
