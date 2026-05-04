import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { MessagesObject, WeatherOrchestrator, FlowInput } from "../WeatherOrchestrator";


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
executeOrchestratedFlow = async (input: FlowInput, history: {role: string; content: string}[] = []): Promise<{ message?: { tool_calls?: any } }> => {
    const orchestrator = new WeatherOrchestrator();
    console.log("inceput")
    const inputDecision = input.type === "init" ? input.question : input.messages.messages
    const agentResponse = await orchestrator.recursiveToolModel(input.type === "init" ? input.question : input.messages);
    history.push({"role": "user","content": JSON.stringify(inputDecision)})

    // console.log(agentResponse)
      if (!agentResponse.message?.tool_calls) {
        return agentResponse;
      } 
      else 
      {
      const toolResponse = await this.getTools(agentResponse.message.tool_calls[0].function.name, agentResponse.message.tool_calls[0].function.arguments);
      console.log("toolcontent")
      console.log(toolResponse.content)
      console.log("agent response is")
      console.log(agentResponse.message)
      console.log("tool calls are")
      console.log(agentResponse.message.tool_calls)
      history.push({"role": "assistant","content": JSON.stringify(agentResponse.message)})
      history.push({"role": "tool","content": JSON.stringify(toolResponse.content)})

      const toolResponseModified:FlowInput= {
        type: "state",
        messages:{ model: "qwen2.5:3b",  messages: history },
        
      }
      console.log("final")
      // console.log(toolResponse)
      console.log(toolResponseModified)
      console.log("history content:", JSON.stringify(toolResponseModified.messages.messages, null, 2))
  return await this.executeOrchestratedFlow(toolResponseModified, history)

  
}
}
}
export const mcpClient = new MCPClient();

