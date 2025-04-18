"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const healthController_1 = require("../controllers/healthController");
exports.routes = [
    {
        path: '/health',
        method: 'GET',
        handler: healthController_1.healthCheck
    }
];
//# sourceMappingURL=index.js.map