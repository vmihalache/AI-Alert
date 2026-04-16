import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import {McpFacade} from "./mcpFacade";
import { z } from "zod";
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});         

server.registerTool(
  "getAlertsForState",
  { 
    title: "get Alerts For State",
    description: "Retrieves weather alerts. If the user mentions a city or town, identify the US State it belongs to and use that state name here. For example, if the user mentions Richmond, VA, use Virginia as the state name.",
     inputSchema: z.object({
      state_name: z.string().describe("Full state name like Virginia"),
    }),
  },
  async ({state_name}: {state_name: string}) => {
    const mcpFacadeToolInstance = new McpFacade();
    const result = await mcpFacadeToolInstance.getAlertsForState(state_name);
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
    description: "Ingests weather alerts for a given state. If the user mentions a city or town, identify the US State it belongs to and use that state name here. For example, if the user mentions Richmond, VA, use Virginia as the state name.",
     inputSchema: z.object({
      state_name: z.string().describe("Full state name like Virginia")
    }),
  },
  async ({state_name}: {state_name: string}) => {
    const mcpFacadeToolInstance = new McpFacade();
    await mcpFacadeToolInstance.ingestAlertsForState(state_name);
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


export async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});