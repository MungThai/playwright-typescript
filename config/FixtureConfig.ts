import {test as base} from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { LogInPage } from '../pageObjects/LogInPage';
import { ProductsPage } from '../pageObjects/ProductsPage';
import { ViewCartPage } from '../pageObjects/ViewCartPage';
import { PaymentPage } from '../pageObjects/PaymentPage';   
import { OrderPlacedPage } from '../pageObjects/OrderPlacedPage';


type fixtures = {
    homePage:HomePage;
    logInPage: LogInPage;
    productsPage: ProductsPage;
    viewCartPage: ViewCartPage;
    paymentPage: PaymentPage;
    orderPlacePage: OrderPlacedPage;
};

export const test = base.extend<fixtures> ({
    homePage:async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    logInPage: async ({ page }, use) => {
        const logInPage = new LogInPage(page);
        await use(logInPage);
    },

    productsPage: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    },

    viewCartPage: async ({ page }, use) => {
        const viewCartPage = new ViewCartPage(page);
        await use(viewCartPage);
    },

    paymentPage: async ({ page }, use) => {
        const paymentPage = new PaymentPage(page);
        await use(paymentPage);
    },

    orderPlacePage: async ({ page }, use) => {
        const orderPlacePage = new OrderPlacedPage(page);
        await use(orderPlacePage);
    },
});

export { expect } from '@playwright/test';


