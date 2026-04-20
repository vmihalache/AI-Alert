import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {McpFacade} from "./mcpFacade";
import { z } from "zod";
import { WeatherOrchestrator } from "../WeatherOrchestrator";
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});         

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
    // console.error("state name", state_name);
    // console.error("does this reach here?");
    // console.error ("DEBUG: Tool getStateCode called with", state_name, "and result", result);
    // console.error("DEBUG: Tool state code called with", state_name);
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
    description: "Fetch and return the current weather and alerts. ",
     inputSchema: z.object({
      state_code: z.string().describe("the US state code"),
    }),
  },
  async ({state_code}: {state_code: string}) => {
    const mcpFacadeToolInstance = new McpFacade();
    await mcpFacadeToolInstance.ingestAlertsForState(state_code);
    return {
      content: [
        {
          type: "text",
          text: "Alerts ingested successfully."
        }
      ]
    };
  }
);
server.registerTool(
  "WeatherOrchestrator",
  {
    title: "Weather Orchestrator",
    description: "Orchestrates the process of fetching weather information and alerts for a given state. ",
  },
 async () => {
    const orchestrator = new WeatherOrchestrator();
    const [name, args] = await orchestrator.getExecutionPlan();
    // Here you would typically call the tool based on the name and args returned by the orchestrator 
    return {
      content: [
        {
          type: "text",
          text: `JSON.stringify(${args})}`,
        },
        {
          type: "text",
          text: name,
        }
      ]
    };
  }
);