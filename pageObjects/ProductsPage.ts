import{ expect, Page } from '@playwright/test';

import { CommonPage } from '../base/commons/CommonPage';
import { CommonScenario } from '../base/commons/CommonScenarios';
import BasePage from '../base/BasePage';

export class ProductsPage extends BasePage {
    private readonly searchField = this.page.locator('input#search_product');
    private readonly categoryWomen = this.page.locator('a[href="#Women"]');
    private readonly categoryMen = this.page.locator('a[href="#Men"]');
    private readonly categoryKids = this.page.locator('a[href="#Kids]"');

    private readonly womenDress = this.page.locator('#Women a[href="/category_products/1"]');
    private readonly womenTops = this.page.locator('#Women a[href="/category_products/2"]');
    private readonly womenSaree = this.page.locator('#Women a[href="/category_products/7"]');

    private readonly menTshirts = this.page.locator('#Men a[href="/category_products/3"]');
    private readonly menJeams = this.page.locator('#Men a[href="/category_products/6"]');

    private readonly kidsDress = this.page.locator('#Kids a[href="/category_products/4"]');
    private readonly kidsShirts = this.page.locator('#Kids a[href="/category_products/5"]');

    // view cart
    private readonly viewCartModal = this.page.locator('#cartModal a[href="/view_cart"]');

 
    constructor(page: Page) {
        super(page, "Products Page");
    }

    public async EnterSearch(search: string): Promise<void> {
        await this.searchField.fill(search);
    }    
    
    public async ClickViewCart(): Promise<void>{
      // await this.page.on('dialog', dialog => dialog.accept());
       await this.viewCartModal.click();
    }

    public async ClickAddToCart(item: string): Promise<void> {
        let xpath: string = `//div[@class="productinfo text-center"]//p[text()="${item}"]/following-sibling::a`;
    
        await this.page.locator(xpath).click();
    }

    private async ClickCatagoryWomen(item: string): Promise<void> {
        await this.categoryWomen.click();
        if(item.toLowerCase() == 'dress') {
            await this.womenDress.click();
        }else if(item.toLowerCase() == 'tops') {
            await this.womenTops.click();
        }else if(item.toLowerCase() == 'saree') {
            await this.womenSaree.click();
        }
    }

    private async ClickCatagoryMen(item: string): Promise<void> {
        await this.categoryMen.click();
        if(item.toLowerCase() == 'tshirts') {
            await this.menTshirts.click();
        }else if(item.toLowerCase() == 'jeans') {
            await this.menJeams.click();
        }
    }

    private async ClickCatagoryKids(item: string): Promise<void> {
        await this.categoryKids.click();
        if(item.toLowerCase() == 'dress') {
            await this.kidsDress.click();
        }else if(item.toLowerCase() == 'tops' || item.toLowerCase() == 'shirts') {
            await this.kidsShirts.click();
        }
    }

    public async clickCatagoryWithItem(category: string, item: string): Promise<void> {
        switch(category) {
            case 'Women':
                await this.ClickCatagoryWomen(item);
            case 'Men':
                await this.ClickCatagoryMen(item);
                break;
            case 'Kids':
                await this.ClickCatagoryKids(item);
                break;

        }
    }
}