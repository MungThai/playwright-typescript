import { expect, Page } from "@playwright/test";
import BasePage from "../base/BasePage";

export class OrderPlacedPage extends BasePage {

    private readonly titleText = this.page.locator('#form b');
    private readonly paraText = this.page.locator('#form p');
    private readonly downloadButton = this.page.locator('#form .check_out');
    private readonly continueButton = this.page.locator('#form a[data-qa="continue-button"]');


    constructor( page: Page ) {
        super(page, " Order Placed Page ");
    }

    public async VerifyTitleText(title: string): Promise<void> {
       await expect(this.titleText).toHaveText(title);
    }

    public async VerifyCongratulationText(para: string): Promise<void> {
        await expect(this.paraText).toHaveText(para);
     }

     public async ClickDownloadButton(): Promise<void> {
        await this.downloadButton.click();
     }

     public async ClickContinueButton(): Promise<void> {
        await this.continueButton.click();
     }
}