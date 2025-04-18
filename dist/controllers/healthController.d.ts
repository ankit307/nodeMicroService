import { IncomingMessage, ServerResponse } from 'http';
export declare const healthCheck: (req: IncomingMessage, res: ServerResponse) => Promise<void>;
