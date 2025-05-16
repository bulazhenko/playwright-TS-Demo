import { test as base, Page } from '@playwright/test';
import { GameApiClient } from '../api/GameApiClient';
import { GamePage } from '../pages/GamePage';
import { Logger } from './logger';

type TestFixtures = {
    apiClient: GameApiClient;
    gamePage: GamePage;
};

export const test = base.extend<TestFixtures>({
    apiClient: async ({ request }, use) => {
        const apiClient = new GameApiClient(request, 'http://localhost:3000');
        Logger.info('API client initialized');
        await use(apiClient);
        Logger.info('API client cleanup');
    },

    gamePage: async ({ page }, use) => {
        const gamePage = new GamePage(page);
        Logger.info('Game page initialized');
        await use(gamePage);
        Logger.info('Game page cleanup');
    }
});

export { expect } from '@playwright/test'; 