import { test, expect } from '@playwright/test';
import { LogInPage }  from '../pages/LogInPage';
import  pages from '../pages/pages';
import data from '../../../resources/test-data/data';

const userName = process.env.WEB_USERNAME!;
const password = process.env.WEB_PASSWORD!;

let logInPage: LogInPage;

// test.use({ storageState: { cookies: [], origins: [] } });

// test.describe.configure({ mode: 'serial '});

test.beforeEach(async ( { page }) => {
    await page.goto( pages.loginPage );
    logInPage = new LogInPage(page);
});

test.describe("Automation Exerice - Log In", () => {
    test("Login successful", async ({page}) => {
        await logInPage.CheckLoggedIn();
        await logInPage.Login(userName, password);
    });
    
    test('Login invalid username', async() => {
        await logInPage.Login(data.userData.invalidUserName, password);
        await logInPage.CheckInvalidCredentials();
    });

    test('Login invalid password', async() => {
        await logInPage.Login(userName, data.userData.invalidPassword);
        await logInPage.CheckInvalidCredentials();
    });
})


