"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = void 0;
const logger_1 = require("../utils/logger");
const healthCheck = async (req, res) => {
    try {
        logger_1.logger.info('Health check requested');
        const response = {
            status: 'healthy',
            timestamp: new Date().toISOString()
        };
        res.statusCode = 200;
        res.end(JSON.stringify(response));
    }
    catch (error) {
        logger_1.logger.error('Health check failed:', error);
        const response = {
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            error: 'Internal Server Error'
        };
        res.statusCode = 500;
        res.end(JSON.stringify(response));
    }
};
exports.healthCheck = healthCheck;
//# sourceMappingURL=healthController.js.map