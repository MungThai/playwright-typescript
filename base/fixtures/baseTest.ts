import { test as baseTest, Page } from "@playwright/test";

import { CommonPage } from "../commons/CommonPage";
import { CommonScenario } from "../commons/CommonScenarios";
import { HomePage } from "../../pageObjects/LogInPage";

interface PageObjects {
    commonPage: CommonPage;
    commonScenario: CommonScenario;
    homePage: HomePage;
}

// Initializing all the page objects
const test = baseTest.extend<PageObjects>({
    commonScenarioPage: async ({ page }, use, testInfo) => {
        await use(new CommonScenario(page, testInfo));
    },
    homePage: async ({ page, commonScenarioPage }, use) => {
        await use(new HomePage(page, commonScenarioPage));
    }

    // allPages: async ({ page, commonScenarioPage }, use) => {
    //     await use({
    //         loginPage: new LoginPage(page, commonScenarioPage),
    //         dashboardPage: new DashboardPage(page, commonScenarioPage)

    //     } as PageObjects);
    // }
    /* ,
        commonPage: async ({ page }, use) => {
            await use(new CommonPage(page));
        } */

});

// this describe block is applicable to all the tests using baseTest
// test.describe('two tests', () => {
//     console.log("in describe");

// });

// hooks as fixtures
test.beforeEach(async ({ page }) => {
    // console.log("beforeEach test");
     await page.goto('https://www.automationexercise.com/');

});

test.afterEach(async ({ }) => {
    // console.log("afterEach test");
});

// export default and name export so spec files can use it
export default test;
export const expect = test.expect;

