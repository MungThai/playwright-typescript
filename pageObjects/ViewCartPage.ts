import { expect, Page } from '@playwright/test';
import BasePage from '../base/BasePage';


export class ViewCartPage extends BasePage {

    private readonly checkoutButton = this.page.locator('#do_action a.check_out');
    private readonly deliverAddressText =  this.page.locator('#address_delivery h3');
    private readonly billingAddressText =  this.page.locator('#address_invoice h3');
    private readonly itemDescriptionText = this.page.locator('#product-30 .cart_description h4');
    private readonly itemQuantityText = this.page.locator('#product-30 .cart_quantity button');
    private readonly itemTotalPriceText = this.page.locator('#product-30 .cart_total_price');
    private readonly placeOrderButton = this.page.locator('#cart_items a[href="/payment"]');

    constructor( page: Page) {
        super(page, "View Cart");
    }

    public async ProceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    public async VerifyDeliveryAddress(address: string): Promise<void> {
        await expect(this.deliverAddressText).toHaveText(address);
    }

    public async VerifyBillingAddress(address: string): Promise<void> {
        await expect(this.billingAddressText).toHaveText(address);
    }

    public async VerifyItemDescription(description: string): Promise<void> {
        await expect(this.itemDescriptionText).toHaveText(description);
    }
    
    public async VerifyItemQuantity(quantity: string): Promise<void> {
        await expect(this.itemQuantityText).toHaveText(quantity);
    }

    public async VerifyItemTotalPrice(totalPrice: string): Promise<void> {
        await expect(this.itemTotalPriceText).toHaveText(totalPrice);
    }

    public async ClickPlaceOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }
}