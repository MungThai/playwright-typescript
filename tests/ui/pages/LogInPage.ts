import { expect, Page } from "@playwright/test";
import BasePage from "../../../base/BasePage";
import messages from '../../../utils/messages';

export class LogInPage extends BasePage {

    private readonly logInEmailField = this.page.locator('.login-form input[name="email"]');
    private readonly logInPasswordField = this.page.locator('.login-form input[name="password"]');
    private readonly logInButton = this.page.locator('.login-form button[type="submit"]');
    private readonly logInErrorText = this.page.locator('.login-form p');

    private readonly signUpNameField = this.page.locator('.signup-form input[name="name"]');
    private readonly signUpEmailField = this.page.locator('.signup-form input[name="email"]');
    private readonly signUpButton = this.page.locator('.signup-form button[type="submit"]');
    private readonly errorMessage = this.page.locator('.login-form p');

    constructor(page: Page) {
        super(page, 'SignUp /LogIn Page');
    }

    private async enterLogInEmail(userName:string): Promise<void> {
        await this.logInEmailField.fill(userName);
    }
        
    private async enterLogInPassword(password: string): Promise<void> {
        await this.logInPasswordField.fill(password);
    }

    private async clickLogInButton(): Promise<void> {
        await this.logInButton.click();
    }

    public async Login(email: string, password: string): Promise<void> {
        await this.enterLogInEmail(email);
        await this.enterLogInPassword(password);
        await this.clickLogInButton();
    }

    public async GetLogInErrorMessage(): Promise<string> {
        return await this.logInErrorText.innerText();
    }

    public async CheckLoggedIn(): Promise<void> {

        await expect(this.page).toHaveURL(/login/);
        await expect(this.page).toHaveTitle('PageObjectParam');
    }

    async CheckInvalidCredentials() {
        await expect(this.errorMessage).toHaveText(messages.login.invalid);
    }
}

export default LogInPage;