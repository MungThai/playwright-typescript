import { Page } from '@playwright/test';
import { urlBuild  } from './UrlBuilder';

import   HomePage   from './HomePage';
import  LogInPage  from './LogInPage';
import  ProductsPage  from './ProductsPage';
import  OrderPlacedPage  from './OrderPlacedPage';
import  PaymentPage  from './PaymentPage';
import  ViewCartPage  from './ViewCartPage';

async function beforeEach(
    page: Page,
    PageObjectParam: ViewCartPage | HomePage | LogInPage | ProductsPage | PaymentPage | OrderPlacedPage,
    targetPage: string,
    params?: Record<any, any>
) {
    await page.goto(urlBuild(targetPage, params));
  //  const pageObject = await new PageObjectParam(page);
  //  return pageObject;
}

export default { beforeEach };