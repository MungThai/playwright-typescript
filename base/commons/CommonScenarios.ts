import { AxeBuilder } from "@axe-core/playwright";
import { test, expect, Page, TestInfo } from "@playwright/test";

export class CommonScenario {
    private map = new Map<string, string>();
  

    constructor(public page: Page, public testinfo: TestInfo) {

    }

    async takeScreenshot(name: string) {
        this.testinfo.attach(
            `${this.testinfo.title}_${name}`,
            {
                contentType: "image/png",
                body: await this.page.screenshot({
                    fullPage: true
                })
            });
    }

    async hooks() {
        console.log("hook from the scenario page");
    }

    setValue(key: string, value: string) {
        this.map.set(key, value);
    }

    getValue(key: string) {
        return this.map.get(key);
    }

    async a11yAnalysis() {
        const accessibilityScanResults = await new AxeBuilder({ page: this.page }).analyze();
        const issues = accessibilityScanResults.violations.length;

        console.log("a11y issue found: " + issues);

        await this.testinfo.attach('accessibility-scan-results',
            {
                contextType: 'application/json',
                body: JSON.stringify(accessibilityScanResults, null, 2)   
            })
    }
}
