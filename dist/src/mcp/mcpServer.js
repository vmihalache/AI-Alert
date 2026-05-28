"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
const mcpFacade_1 = require("./mcpFacade");
const zod_1 = require("zod");
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
exports.server = new mcp_js_1.McpServer({
    name: "weather",
    version: "1.0.0",
});
// const transport = new StdioServerTransport();
exports.server.registerTool("getStateCode", {
    title: "Get State Code",
    description: "This return the US state code based on the users given state name",
    inputSchema: zod_1.z.object({
        state_name: zod_1.z.string().describe("US state name"),
    }),
}, async ({ state_name }) => {
    const mcpFacadeToolInstance = new mcpFacade_1.McpFacade();
    const result = await mcpFacadeToolInstance.getCodesForState(state_name);
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(result)
            }
        ]
    };
});
exports.server.registerTool("ingestAlertsForState", {
    title: "Ingest Alerts For State",
    description: "You are a weather alert assistant. Use tools to get data. Reply with ONLY the weather information. Do NOT ask questions. Do NOT offer further help. Do NOT explain your process. One response, then stop.",
    inputSchema: zod_1.z.object({
        state_code: zod_1.z.string().describe("the US state code"),
    }),
}, async ({ state_code }) => {
    const mcpFacadeToolInstance = new mcpFacade_1.McpFacade();
    const weatherAlerts = await mcpFacadeToolInstance.ingestAlertsForState(state_code);
    const filteredWeatherAlerts = !Array.isArray(weatherAlerts) ? weatherAlerts : weatherAlerts?.map((alert) => ({
        event: alert.event,
        severity: alert.severity,
        description: alert.description,
        instruction: alert.instruction,
    }));
    return {
        content: [
            {
                type: "text",
                text: JSON.stringify(filteredWeatherAlerts)
            }
        ]
    };
});
// server.connect(transport);
//# sourceMappingURL=mcpServer.js.map