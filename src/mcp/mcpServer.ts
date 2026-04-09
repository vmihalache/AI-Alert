import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import {McpGateway} from "./mcpGateway";
import {McpFacade} from "./mcpFacade";
import { z } from "zod";
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
});         
server.registerTool(
  "mcpgateway",
  {
    title: "Calculate Area",
    description: "Calculates the area of a rectangle",
   inputSchema: z.object({
  state_code: z.string().describe("Two letter state code like VA")
})
    },
  async ({state_code}: {state_code: string}) => {
    const mcpGatewayToolInstance = new McpGateway();
    return await mcpGatewayToolInstance.convertAlerts(state_code);
  });
server.registerTool(
  "mcpfacade",
  { 
    title: "MCP Facade",
    description: "A facade for interacting with the MCP",
     inputSchema: z.object({
      state_name: z.string().describe("Full state name like Virginia"),
    }),
  },
  async ({state_name}: {state_name: string}) => {
    const mcpFacadeToolInstance = new McpFacade();
    return await mcpFacadeToolInstance.getAlertsForState(state_name);
  }
);


async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});