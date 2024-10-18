import { test, expect } from '../../config/FixtureConfig';
import { PaymentPage } from '../../pageObjects/PaymentPage';
import { OrderPlacedPage } from '../../pageObjects/OrderPlacedPage';

test.describe('Purchase Men T-Shirt', () => {

    test("End to End", async ({ page, homePage, logInPage, productsPage, viewCartPage, paymentPage,orderPlacePage }) => {
        await homePage.open();
        await homePage.NavigateTo('LogIn');
        let url: string = await page.url();
        let pageUrl: string = await logInPage.getPageUrl();

        await expect(await page.url()).toContain(await logInPage.getPageUrl());

        await logInPage.Login('username', 'password');
        
       
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
