import Repository from "../repository/repository.ts";
class McpGateway {
    async convertAlerts(state_code: string) {
        return  await Repository.getCodes(state_code);
    }
}