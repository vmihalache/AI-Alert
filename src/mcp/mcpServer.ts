import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {McpFacade} from "./mcpFacade";
import { z } from "zod";
import { WeatherOrchestrator } from "../WeatherOrchestrator";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});
const transport = new StdioServerTransport();
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
    const response = await orchestrator.recursiveToolModel({
      "model": "qwen2.5:3b",
      "messages": [ 
        { "role": "system", "content": "You are a specialized weather orchestrator..." },
        { "role": "user", "content": "What is the weather in Virginia?" }
      ],
    });
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response),
        },
      ]
    };
  }
);
server.connect(transport);