import { Page } from '@playwright/test';
import { promises } from 'dns';
import dotenv from 'dotenv';

export default abstract class BasePage {

    //protected readonly BASE_URL = ({baseURL}, use);
    protected readonly PAGE_NAME: string;
    protected readonly PAGE_URL: string;
    protected readonly page: Page;

    BASE_URL: string = '/';

    constructor( page: Page, pageName: string, pageUrl = '') {
        this.page = page;
        this.PAGE_NAME = pageName;
        this.PAGE_URL = pageUrl;
    }

    public async open(): Promise<void> {
        await this.page. goto(`${this.BASE_URL}${this.PAGE_URL}`);
    }

    public async getPageUrl(): Promise<string> {
        return `${this.BASE_URL}${this.PAGE_URL}`;
    }
}