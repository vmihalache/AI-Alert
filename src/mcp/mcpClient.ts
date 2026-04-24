import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { WeatherOrchestrator } from "../WeatherOrchestrator";

export class MCPClient {
    transport: StdioClientTransport;
    constructor(
    ) {
        this.transport = new StdioClientTransport({
            command: "npx",
            args: ["tsx", "./src/mcp/mcpServer.ts"],
        });
    }

client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

connection = async () => {
await this.client.connect(this.transport);
}
// List prompts

getPrompts = async () => {
return await this.client.listPrompts();
}
getPrompt = async (name: string, args: any) => {
return await this.client.getPrompt({
  name: "example-prompt",
  arguments: {
    arg1: "value"
  }
});
}
// List resources
getResources = async () => {
return await this.client.listResources();
}

// Read a resource
getResource = async (uri: string) => {
return await this.client.readResource({
  uri: uri
});
}

getTools = async (toolName: string, toolArguments: {}) => {
return await this.client.callTool(
  {
  name: toolName,
  arguments: toolArguments
  }
)
}

executeOrchestratedFlow = async (messagesObject: {}): Promise<{ message?: { tool_calls?: any } }> => {
    const orchestrator = new WeatherOrchestrator();
    const agentResponse = await orchestrator.recursiveToolModel(messagesObject);
      if (!agentResponse.message.tool_calls) {
        return agentResponse;
      } 
      else 
      {
      const toolResponse = await this.getTools(agentResponse.message.tool_calls[0].function.name, agentResponse.message.tool_calls[0].function.arguments);
      return await this.executeOrchestratedFlow(toolResponse)}
    }
}

      


