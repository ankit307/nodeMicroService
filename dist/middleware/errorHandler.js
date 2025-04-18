"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../utils/logger");
const errorHandler = (error, req, res) => {
    logger_1.logger.error('Error occurred:', error);
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.statusCode = statusCode;
    res.end(JSON.stringify({
        error: message,
        timestamp: new Date().toISOString()
    }));
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map