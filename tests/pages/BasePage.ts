import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';

type WaitForSelectorOptions = {
    state?: 'attached' | 'detached' | 'visible' | 'hidden';
    timeout?: number;
};

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async waitForElement(selector: string, timeout = 10000): Promise<void> {
        Logger.debug(`Waiting for element: ${selector}`);
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    protected async clickElement(selector: string, timeout = 10000): Promise<void> {
        Logger.debug(`Clicking element: ${selector}`);
        const element = await this.page.waitForSelector(selector, { state: 'visible', timeout });
        await element.click();
    }

    protected async getText(selector: string): Promise<string | null> {
        Logger.debug(`Getting text from element: ${selector}`);
        const element = await this.page.waitForSelector(selector, { state: 'visible' });
        return element.textContent();
    }

    protected async isElementEnabled(selector: string): Promise<boolean> {
        Logger.debug(`Checking if element is enabled: ${selector}`);
        const element = await this.page.waitForSelector(selector, { state: 'visible' });
        return !(await element.getAttribute('disabled'));
    }

    // Public methods for test assertions
    async getLocator(selector: string): Promise<Locator> {
        return this.page.locator(selector);
    }

    async waitForSelector(selector: string, options: WaitForSelectorOptions = {}): Promise<void> {
        await this.page.waitForSelector(selector, options);
    }
} 