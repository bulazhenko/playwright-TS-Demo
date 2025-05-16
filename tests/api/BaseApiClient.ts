import { APIRequestContext } from '@playwright/test';
import { Logger } from '../utils/logger';

export class BaseApiClient {
    protected context: APIRequestContext;
    protected baseUrl: string;

    constructor(context: APIRequestContext, baseUrl: string) {
        this.context = context;
        this.baseUrl = baseUrl;
        Logger.info(`Initialized BaseApiClient with baseUrl: ${baseUrl}`);
    }

    protected async post<T>(endpoint: string, data: any): Promise<T> {
        Logger.debug(`Making POST request to ${endpoint}`, { data });
        try {
            const response = await this.context.post(`${this.baseUrl}${endpoint}`, {
                data
            });
            const jsonResponse = await response.json();
            Logger.debug(`POST response from ${endpoint}`, { response: jsonResponse });
            return jsonResponse;
        } catch (error) {
            Logger.error(`POST request failed for ${endpoint}`, { error, data });
            throw error;
        }
    }

    protected async get<T>(endpoint: string): Promise<T> {
        Logger.debug(`Making GET request to ${endpoint}`);
        try {
            const response = await this.context.get(`${this.baseUrl}${endpoint}`);
            const jsonResponse = await response.json();
            Logger.debug(`GET response from ${endpoint}`, { response: jsonResponse });
            return jsonResponse;
        } catch (error) {
            Logger.error(`GET request failed for ${endpoint}`, { error });
            throw error;
        }
    }
} 