import {Repository} from "../repository/schema";
import {Ingestion} from "../Ingestion";

export class McpGateway {
    async convertAlerts(state_code: string) {
        // const stateCode = state_code.toLowerCase();
        const result = await Repository.getCodes(state_code);
        console.error("DEBUG: McpGateway convertAlerts called with", state_code, "and result", result);
        return result[0]?.statesCode;
    }
    async ingestAlertsForState(state_code: string) {
        const ingestion = new Ingestion(state_code);
        await ingestion.ingestDataFromWeatherAPi();
    }
}