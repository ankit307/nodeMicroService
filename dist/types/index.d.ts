import { IncomingMessage, ServerResponse } from 'http';
export interface Route {
    path: string;
    method: string;
    handler: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
}
export interface Logger {
    info: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
    debug: (message: string, ...args: any[]) => void;
}
export interface HealthResponse {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    error?: string;
}
