"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = require("url");
const routes_1 = require("./routes");
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./utils/logger");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(async (req, res) => {
    try {
        const { pathname, query } = (0, url_1.parse)(req.url || '', true);
        const method = req.method?.toUpperCase() || 'GET';
        // Set default headers
        res.setHeader('Content-Type', 'application/json');
        // Find matching route
        const route = routes_1.routes.find((r) => r.path === pathname && r.method === method);
        if (route) {
            await route.handler(req, res);
        }
        else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res);
    }
});
server.on('error', (error) => {
    logger_1.logger.error('Server error:', error);
});
server.listen(PORT, () => {
    logger_1.logger.info(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map