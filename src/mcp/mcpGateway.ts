import {Repository} from "../repository/schema";
export class McpGateway {
    async convertAlerts(state_code: string) {
        return  await Repository.getCodes(state_code);
    }
}