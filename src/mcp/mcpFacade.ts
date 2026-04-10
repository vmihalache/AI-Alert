import { McpGateway } from "./mcpGateway";
export class McpFacade {
    async getAlertsForState(state_name: string) {
        const mcpGateway = new McpGateway();
        return await mcpGateway.convertAlerts(state_name);
    }
}