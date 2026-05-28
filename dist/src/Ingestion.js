"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ingestion = void 0;
const schema_1 = require("./repository/schema"); // Adjust the path based on where Reposito
const CentralGateway_1 = require("./CentralGateway"); // Adjust the path based on where CentralGateway is defined
class Ingestion {
    stateCode;
    constructor(stateCode) {
        this.stateCode = stateCode;
    }
    async ingestDataFromWeatherAPi() {
        console.log(`Fetching weather alerts for state code: ${this.stateCode}`);
        const raw = await CentralGateway_1.httpGateway.fetchData(`https://api.weather.gov/alerts/active/area/${this.stateCode}`, "GET");
        const transformed = await raw.json();
        if (transformed.features.length === 0) {
            return { description: `No active alerts for ${this.stateCode}.` };
        }
        // The weather API wraps the list in a "features" array
        if (!transformed.features || !Array.isArray(transformed.features)) {
            return;
        }
        const transformedAlerts = transformed.features;
        const stored = transformedAlerts.map((alert) => ({
            ...alert.properties, stateCode: this.stateCode
        }));
        await schema_1.Repository.pushAlerts(stored);
        const allAlerts = await schema_1.Repository.getAlerts(this.stateCode);
        return allAlerts;
    }
}
exports.Ingestion = Ingestion;
//# sourceMappingURL=Ingestion.js.map