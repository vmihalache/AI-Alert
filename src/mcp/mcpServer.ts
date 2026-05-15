import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {McpFacade} from "./mcpFacade";
import { z } from "zod";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
export const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});
// const transport = new StdioServerTransport();
server.registerTool(
  "getStateCode",
  { 
    title: "Get State Code",
    description: "This return the US state code based on the users given state name",
     inputSchema: z.object({
      state_name: z.string().describe("US state name"),
    }),
  },
  async ({state_name}: {state_name: string}) => {
    const mcpFacadeToolInstance = new McpFacade();
    const result = await mcpFacadeToolInstance.getCodesForState(state_name);
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result)
        }
      ]
    };
  }
);
server.registerTool(
  "ingestAlertsForState",
  {
    title: "Ingest Alerts For State",
    description: "You are a weather alert assistant. Use tools to get data. Reply with ONLY the weather information. Do NOT ask questions. Do NOT offer further help. Do NOT explain your process. One response, then stop.",
     inputSchema: z.object({
      state_code: z.string().describe("the US state code"),
    }),
  },
  async ({state_code}: {state_code: string}) => {
    const mcpFacadeToolInstance = new McpFacade();
    const weatherAlerts = await mcpFacadeToolInstance.ingestAlertsForState(state_code);
    const filteredWeatherAlerts = !Array.isArray(weatherAlerts) ? weatherAlerts : weatherAlerts?.map((alert: any) => ({
      event: alert.event,
      severity: alert.severity,
      description: alert.description,
      instruction: alert.instruction,
    }))
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(filteredWeatherAlerts)
        }
      ]
    };
  }
);

// server.connect(transport);