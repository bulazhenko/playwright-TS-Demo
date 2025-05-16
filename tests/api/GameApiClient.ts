import { APIRequestContext } from '@playwright/test';
import { BaseApiClient } from './BaseApiClient';
import { Logger } from '../utils/logger';

interface PlayerResponse {
    playerId: string;
}

interface GameResponse {
    gameId: string;
}

export class GameApiClient extends BaseApiClient {
    constructor(context: APIRequestContext, baseUrl: string) {
        super(context, baseUrl);
        Logger.info(`Initialized GameApiClient with baseUrl: ${baseUrl}`);
    }

    async getPlayerId(): Promise<string> {
        Logger.info('Requesting player ID');
        try {
            const response = await this.post<PlayerResponse>('/api/player', {});
            Logger.info(`Player ID received: ${response.playerId}`);
            return response.playerId;
        } catch (error) {
            Logger.error('Failed to get player ID', error);
            throw error;
        }
    }

    async getGameId(gameType: 'ROL' | 'BJ' | 'BAC'): Promise<string> {
        Logger.info(`Requesting game ID for game type: ${gameType}`);
        try {
            const response = await this.post<GameResponse>('/api/game', { gameType });
            Logger.info(`Game ID received: ${response.gameId}`);
            return response.gameId;
        } catch (error) {
            Logger.error(`Failed to get game ID for game type: ${gameType}`, error);
            throw error;
        }
    }
} 