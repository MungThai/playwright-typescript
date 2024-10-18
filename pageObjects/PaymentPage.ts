import { expect, Page } from "@playwright/test";
import BasePage from "../base/BasePage";

export class PaymentPage extends BasePage {

    private readonly nameOnCardField = this.page.locator('#payment-form input[name="name_on_card"]');
    private readonly cardNumberField = this.page.locator('#payment-form input[name="card_number"]');
    private readonly cardCVCField = this.page.locator('#payment-form input[name="cvc"]');
    private readonly cardExpirationMonthField = this.page.locator('#payment-form input[name="expiry_month"]');
    private readonly cardExpirationYearField = this.page.locator('#payment-form input[name="expiry_year"]');
    private readonly payAndConfirmOrderButton = this.page.locator('#payment-form button#submit');

    constructor( page: Page) {
        super( page, "Payment Page");
    }

    public async EnterNameOnCart(name: string): Promise<void> {
        await this.nameOnCardField.fill(name);
    }

    public async EnterCardNumber(number: string): Promise<void> {
        await this.cardNumberField.fill(number);
    }

    public async EnterCardCVC(cvc: string): Promise<void> {
        await this.cardCVCField.fill(cvc);
    }

    public async EnterCardExpireMonth(month: string): Promise<void> {
        await this.cardExpirationMonthField.fill(month);
    }

    public async EnterCardExpireYear(year: string): Promise<void> {
        await this.cardExpirationYearField.fill(year);
    }

    public async ClickConfirmOrderButton(): Promise<void> {
        await this.payAndConfirmOrderButton.click();
    }
}