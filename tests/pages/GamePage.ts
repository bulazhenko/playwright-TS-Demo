import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Logger } from '../utils/logger';

export class GamePage extends BasePage {
    private readonly selectors = {
        playButton: '[data-locator="play-button"]',
        gameResult: '[data-locator="game-result"]',
        errorMessage: '[data-locator="error-message"]'
    };

    constructor(page: Page) {
        super(page);
    }

    async navigate(playerId: string, gameId: string): Promise<void> {
        Logger.info(`Navigating to game page with playerId: ${playerId} and gameId: ${gameId}`);
        await this.page.goto(`/game?playerid=${playerId}&gameid=${gameId}`);
        Logger.debug('Navigation completed');
    }

    async waitForPlayButton(): Promise<void> {
        await this.waitForElement(this.selectors.playButton);
    }

    async clickPlayButton(): Promise<void> {
        await this.waitForElement(this.selectors.playButton);
        
        Logger.debug('Waiting for play button to be enabled');
        await this.page.waitForFunction(
            (selector) => {
                const button = document.querySelector(selector);
                return button && !button.hasAttribute('disabled');
            },
            this.selectors.playButton,
            { timeout: 10000 }
        );

        await this.clickElement(this.selectors.playButton);
    }

    async waitForGameResult(): Promise<string> {
        await this.waitForElement(this.selectors.gameResult, 15000);
        const result = await this.getText(this.selectors.gameResult);
        
        if (!result || !['win', 'lose'].includes(result.toLowerCase())) {
            Logger.error(`Unexpected game result: ${result}`);
            throw new Error(`Unexpected game result: ${result}`);
        }

        return result.toLowerCase();
    }

    async getErrorMessage(): Promise<string | null> {
        return this.getText(this.selectors.errorMessage);
    }

    async waitForErrorMessage(): Promise<void> {
        await this.waitForElement(this.selectors.errorMessage);
    }
} 