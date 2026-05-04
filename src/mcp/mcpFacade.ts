import { McpGateway } from "./mcpGateway";
export class McpFacade {
     mcpGateway = new McpGateway();
    async getCodesForState(state_name: string) {
        const result = await this.mcpGateway.convertAlerts(state_name);
        return result;
    }
    async ingestAlertsForState(state_code: string) {
        return await this.mcpGateway.ingestAlertsForState(state_code);
    }
}