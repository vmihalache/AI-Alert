import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { WeatherOrchestrator } from "../WeatherOrchestrator";
import { FlowInput } from "../../types/sharedTypes";


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
executeOrchestratedFlow = async (input: FlowInput, environment: string, model: string, history: {role: string; content: string; tool_call_id?: string}[] = []): Promise<{ message?: { tool_calls?: any; content?: string; role?: string } }> => {
    const orchestrator = new WeatherOrchestrator();
    const inputDecision = input.type === "init" ? input.question : input.messages.messages
    const agentResponse = await orchestrator.recursiveToolModel(input.type === "init" ? input.question : input.messages, environment === "production" ? "production" : "local", model);
    history.push({"role": "user","content": JSON.stringify(inputDecision)})

    // console.log(agentResponse)
      if (!agentResponse.message?.tool_calls) {
        return agentResponse;
      } 
      else 
      {
      const toolArgument = agentResponse.message.tool_calls[0].function.arguments;
      console.log("Raw tool arguments:", toolArgument)
      const toolArgumentProd = environment === "production" ? JSON.parse(toolArgument) : toolArgument
      console.log("Tool call detected. Executing tool with arguments:", toolArgumentProd)
      const toolResponse = await this.getTools(agentResponse.message.tool_calls[0].function.name, toolArgumentProd);
      console.log("Tool response:", toolResponse)
      history.push({"role": "assistant","content": JSON.stringify(agentResponse.message)})
      history.push({"role": "tool","content": typeof toolResponse.content === 'string' ? toolResponse.content : JSON.stringify(toolResponse.content), tool_call_id: agentResponse.message.tool_calls[0].id})

      const toolResponseModified:FlowInput= {
        type: "state",
        messages:{ model: "qwen2.5:3b",  messages: history },
      }
  return await this.executeOrchestratedFlow(toolResponseModified,environment, model, history);
}
}
}
export const mcpClient = new MCPClient();

