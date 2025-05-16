import { test, expect } from './utils/BaseTest';
import { Logger } from './utils/logger';
import { GameApiClient } from './api/GameApiClient';
import { GamePage } from './pages/GamePage';

test.describe('Game Flow', () => {
    test('should complete a game round and show result', async ({ apiClient, gamePage }) => {
        const playerId = await apiClient.getPlayerId();
        const gameId = await apiClient.getGameId('BJ');

        await gamePage.navigate(playerId, gameId);
        await gamePage.waitForPlayButton();
        await gamePage.clickPlayButton();

        const result = await gamePage.waitForGameResult();
        expect(['win', 'lose']).toContain(result);
    });

    test('should handle invalid player ID', async ({ apiClient, gamePage }) => {
        const invalidPlayerId = 'invalid-player-id';
        const gameId = await apiClient.getGameId('BJ');

        await gamePage.navigate(invalidPlayerId, gameId);
        await gamePage.waitForErrorMessage();
        const errorText = await gamePage.getErrorMessage();
        expect(errorText).toContain('Invalid player ID');
    });

    test('should handle invalid game ID', async ({ apiClient, gamePage }) => {
        const playerId = await apiClient.getPlayerId();
        const invalidGameId = 'invalid-game-id';

        await gamePage.navigate(playerId, invalidGameId);
        await gamePage.waitForErrorMessage();
        const errorText = await gamePage.getErrorMessage();
        expect(errorText).toContain('Invalid game ID');
    });

    test('should handle network timeout when getting player ID', async ({ apiClient }) => {
        await expect(apiClient.getPlayerId()).rejects.toThrow();
    });

    test('should handle different game types', async ({ apiClient, gamePage }) => {
        const playerId = await apiClient.getPlayerId();
        const gameTypes = ['ROL', 'BJ', 'BAC'] as const;
        
        for (const gameType of gameTypes) {
            Logger.info(`Testing game type: ${gameType}`);
            const gameId = await apiClient.getGameId(gameType);
            await gamePage.navigate(playerId, gameId);
            await gamePage.waitForPlayButton();
            await gamePage.clickPlayButton();
            const result = await gamePage.waitForGameResult();
            expect(['win', 'lose']).toContain(result);
        }
    });

    test('should handle multiple game rounds', async ({ apiClient, gamePage }) => {
        const playerId = await apiClient.getPlayerId();
        const gameId = await apiClient.getGameId('BJ');

        await gamePage.navigate(playerId, gameId);

        for (let i = 0; i < 3; i++) {
            Logger.info(`Playing round ${i + 1}`);
            await gamePage.waitForPlayButton();
            await gamePage.clickPlayButton();
            const result = await gamePage.waitForGameResult();
            expect(['win', 'lose']).toContain(result);
        }
    });

    test('should handle rapid play button clicks', async ({ apiClient, gamePage }) => {
        const playerId = await apiClient.getPlayerId();
        const gameId = await apiClient.getGameId('BJ');

        await gamePage.navigate(playerId, gameId);
        await gamePage.waitForPlayButton();

        // Attempt to click play button multiple times rapidly
        for (let i = 0; i < 5; i++) {
            await gamePage.clickPlayButton().catch(() => {
            });
        }

        // Verify that the game still completes successfully
        const result = await gamePage.waitForGameResult();
        expect(['win', 'lose']).toContain(result);
    });

    test('should display correct game result after round completion', async ({ apiClient, gamePage }) => {
        const playerId = await apiClient.getPlayerId();
        const gameId = await apiClient.getGameId('BJ');

        await gamePage.navigate(playerId, gameId);
        await gamePage.waitForPlayButton();
        await gamePage.clickPlayButton();

        // Verify game result element is displayed
        const resultElement = await gamePage.getLocator('[data-locator="game-result"]');
        await expect(resultElement).toBeVisible();
        const resultText = await resultElement.textContent();
        expect(['win', 'lose']).toContain(resultText?.toLowerCase());
    });
}); 