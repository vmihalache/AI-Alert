import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { WeatherOrchestrator } from "../WeatherOrchestrator";
import { FlowInput } from "../../types/sharedTypes";
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import dontenv from 'dotenv';
dontenv.config();


export class MCPClient {
    clientTransport: StreamableHTTPClientTransport;
    constructor(
    ) {
        this.clientTransport = new StreamableHTTPClientTransport(new URL(process.env.MCP_URL ?? "http://localhost:3000/mcp"), {
  sessionId: undefined,
        });
    }

client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

connection = async () => {
await this.client.connect(this.clientTransport);
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
executeOrchestratedFlow = async (input: FlowInput, environment: string, model: string, history: {role: string; content: string; tool_call_id?: string}[] = []): Promise<{choices: []; message?: { tool_calls?: any; content?: string; role?: string } }> => {
    console.log("Executing orchestrated flow with input:", input, "environment:", environment, "model:", model)
    const orchestrator = new WeatherOrchestrator();
    const inputDecision = input.type === "init" ? input.question : input.messages.messages
    const agentResponse = await orchestrator.recursiveToolModel(input.type === "init" ? input.question : input.messages, environment === "production" ? "production" : "local", model);
    history.push({"role": "user","content": JSON.stringify(inputDecision)})
    console.log("Agent response:", agentResponse)

    // console.log(agentResponse)
      if (!agentResponse.choices[0].message?.tool_calls) {
        return agentResponse;
      } 
      else 
      {
      const toolArgument = agentResponse.choices[0].message.tool_calls[0].function.arguments;
      console.log("Raw tool arguments:", toolArgument)
      const toolArgumentProd = environment === "production" ? JSON.parse(toolArgument) : toolArgument
      console.log("Tool call detected. Executing tool with arguments:", toolArgumentProd)
      const toolResponse = await this.getTools(agentResponse.choices[0].message.tool_calls[0].function.name, toolArgumentProd);
      console.log("Tool response:", toolResponse)
      history.push({"role": "assistant","content": JSON.stringify(agentResponse.choices[0].message)})
      history.push({"role": "tool","content": typeof toolResponse.content === 'string' ? toolResponse.content : JSON.stringify(toolResponse.content), tool_call_id: agentResponse.choices[0].message.tool_calls[0].id})

      const toolResponseModified:FlowInput= {
        type: "state",
        messages:{ model: model,  messages: history },
      }
  return await this.executeOrchestratedFlow(toolResponseModified,environment, model, history);
}
}
}
export const mcpClient = new MCPClient();

