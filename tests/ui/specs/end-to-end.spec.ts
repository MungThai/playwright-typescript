import { test, expect } from '../fixtures/FixtureConfig';
import { ReportingApi } from '@reportportal/agent-js-playwright'
import { PaymentPage } from '../pages/PaymentPage';
import { OrderPlacedPage } from '../pages/OrderPlacedPage';
import HomePage from '../pages/HomePage';
import LogInPage from '../pages/LogInPage';
import ProductsPage from '../pages/ProductsPage';
import ViewCartPage from '../pages/ViewCartPage';
import  pages from '../pages/pages';

const userName = process.env.WEB_USERNAME!;
const password = process.env.WEB_PASSWORD!;

test.beforeEach(async ( {page, logInPage}) => {
    await page.goto( pages.loginPage );
    logInPage = new LogInPage(page);
});

test.describe('Automation Exerices - Purchase Men T-Shirt', () => {

    test("End to End", async ({ page,homePage, logInPage, productsPage, viewCartPage, paymentPage,orderPlacePage }) => {

        await homePage.open();
        await homePage.NavigateTo('LogIn');
        let url: string = await page.url();
        let pageUrl: string = await logInPage.getPageUrl();

        await expect(await page.url()).toContain(await logInPage.getPageUrl());

        await logInPage.Login(userName, password);
        
        // Products
        await homePage.NavigateTo('Products');
        await productsPage.clickCatagoryWithItem('Men', 'TShirts');
        await productsPage.ClickAddToCart('Premium Polo T-Shirts');
        await productsPage.ClickViewCart();

        // Verify in View Cart
        await viewCartPage.VerifyItemDescription('Premium Polo T-Shirts');
        await viewCartPage.VerifyItemQuantity('1');
        await viewCartPage.VerifyItemTotalPrice('Rs. 1500');
        await viewCartPage.ProceedToCheckout();

        // Invoice
        await viewCartPage.VerifyDeliveryAddress('Your delivery address');
        await viewCartPage.VerifyBillingAddress('Your billing address');
        await viewCartPage.VerifyItemDescription('Premium Polo T-Shirts');
        await viewCartPage.VerifyItemQuantity('1');
        await viewCartPage.VerifyItemTotalPrice('Rs. 1500');
        await viewCartPage.ClickPlaceOrder();

        // Payment
        await paymentPage.EnterNameOnCart('Automation Tester');
        await paymentPage.EnterCardNumber('123456789');
        await paymentPage.EnterCardCVC('123');
        await paymentPage.EnterCardExpireMonth('01');
        await paymentPage.EnterCardExpireYear('2050');
        await paymentPage.ClickConfirmOrderButton();

        // Order Placed
        await orderPlacePage.VerifyTitleText('Order Placed!');
        await orderPlacePage.VerifyCongratulationText('Congratulations! Your order has been confirmed!');
        await orderPlacePage.ClickContinueButton();

    });
})
