"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.McpFacade = void 0;
const mcpGateway_1 = require("./mcpGateway");
class McpFacade {
    mcpGateway = new mcpGateway_1.McpGateway();
    async getCodesForState(state_name) {
        const result = await this.mcpGateway.convertAlerts(state_name);
        return result;
    }
    async ingestAlertsForState(state_code) {
        return await this.mcpGateway.ingestAlertsForState(state_code);
    }
}
exports.McpFacade = McpFacade;
//# sourceMappingURL=mcpFacade.js.map