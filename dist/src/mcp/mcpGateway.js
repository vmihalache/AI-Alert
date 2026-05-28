"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McpGateway = void 0;
const schema_1 = require("../repository/schema");
const Ingestion_1 = require("../Ingestion");
class McpGateway {
    async convertAlerts(state_code) {
        const result = await schema_1.Repository.getCodes(state_code);
        return result[0]?.statesCode;
    }
    async ingestAlertsForState(state_code) {
        const ingestion = new Ingestion_1.Ingestion(state_code);
        return await ingestion.ingestDataFromWeatherAPi();
    }
}
exports.McpGateway = McpGateway;
//# sourceMappingURL=mcpGateway.js.map