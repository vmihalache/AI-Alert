import {Repository} from "../repository/schema";
import {Ingestion} from "../Ingestion";

export class McpGateway {
    async convertAlerts(state_code: string) {
        return  await Repository.getCodes(state_code);
    }
    async ingestAlertsForState(state_code: string) {
        const ingestion = new Ingestion(state_code);
        await ingestion.ingestDataFromWeatherAPi();
    }
}
