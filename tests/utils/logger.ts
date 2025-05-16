export class Logger {
    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    static info(message: string, ...args: any[]): void {
        console.log(`[${this.getTimestamp()}] INFO: ${message}`, ...args);
    }

    static error(message: string, ...args: any[]): void {
        console.error(`[${this.getTimestamp()}] ERROR: ${message}`, ...args);
    }

    static debug(message: string, ...args: any[]): void {
        console.debug(`[${this.getTimestamp()}] DEBUG: ${message}`, ...args);
    }

    static warn(message: string, ...args: any[]): void {
        console.warn(`[${this.getTimestamp()}] WARN: ${message}`, ...args);
    }
} 