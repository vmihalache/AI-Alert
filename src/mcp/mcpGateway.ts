import {Repository} from "../repository/schema";
import {Ingestion} from "../Ingestion";

export class McpGateway {
    async convertAlerts(state_code: string) {
console.error("convertAlerts called with:", JSON.stringify(state_code))
        // const stateCode = state_code.toLowerCase();
        const result = await Repository.getCodes(state_code);
        return result[0]?.statesCode;
    }
    async ingestAlertsForState(state_code: string) {
        const ingestion = new Ingestion(state_code);
        return await ingestion.ingestDataFromWeatherAPi()
    }
}