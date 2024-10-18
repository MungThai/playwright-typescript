import { expect, Page } from "@playwright/test"; 
import BasePage from "../base/BasePage";

export class HomePage extends BasePage {

    private readonly menuHome = this.page.locator('.nav a[href="/"]');
    private readonly menuProducts = this.page.locator('.nav a[href="/products"]');
    private readonly menuViewCart = this.page.locator('.nav a[href="/view_cart"]');
    private readonly menuLogIn = this.page.locator('.nav a[href="/login"]');
    private readonly menuTestCases = this.page.locator('.nav a[href="/test_cases"]');
    private readonly menuApiTesting = this.page.locator('.nav a[href="/api_list"]');
    private readonly menuVideoTutorial = this.page.locator('.nav a[href="https://www.youtube.com/c/AutomationExercise"]');
    private readonly menuContactUs = this.page.locator('.nav a[href="/contact_us"]');

    constructor(page: Page) {
        super(page, 'Home Page');
    }


    // Menu Main
    public async NavigateTo(menuOption: string): Promise<void> {

        switch(menuOption) {
            case 'Home':
                await this.menuHome.click();
                break;
            case 'Products':
                await this.menuProducts.click();
                break;
            case 'Cart':
                await this.menuViewCart.click();
                break;
            case 'SignUp':
            case 'LogIn':
                await this.menuLogIn.click();
                break;
            case 'TestCase':
                await this.menuTestCases.click();
                break;
            case 'API Testing':
                await this.menuApiTesting.click();
                break;
            case 'Video Tutorial':
                await this.menuVideoTutorial.click();
                break;
            case 'Contact us':
                await this.menuContactUs.click();
                break;
            default:
                await this.menuHome.click();
                break;
        }
    }

}