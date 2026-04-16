import { McpGateway } from "./mcpGateway";
export class McpFacade {
     mcpGateway = new McpGateway();
    async getAlertsForState(state_name: string) {
        return await this.mcpGateway.convertAlerts(state_name);
    }
    async ingestAlertsForState(state_name: string) {
        await this.mcpGateway.ingestAlertsForState(state_name);
    }
}