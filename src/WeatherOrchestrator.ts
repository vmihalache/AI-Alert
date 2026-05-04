import {httpGateway} from "./CentralGateway";   
import { mcpClient } from "./mcp/mcpClient"
type MCPTool = {
  name: string;
  description?: string;
  inputSchema: any;
};
export type MessagesObject = {
  model: string;
  messages: {
    role: string;
    content: string;
  }[];
};
export type FlowInput =
  | { type: "init"; question: string }
  | { type: "state"; messages: MessagesObject };


export class WeatherOrchestrator {
    recursiveToolModel = async (input: string | MessagesObject): Promise<{ message?: { tool_calls?: any } }> => {
    const toolResponse = await mcpClient.client.listTools() as { tools: MCPTool[] };
    const mappedTools = toolResponse.tools.map((t) => ({
            type: "function",
            function: {
                name: t.name,
                description: t.description,
                parameters: t.inputSchema 
            }
        }))
    const fuckGeminiTheShittiestLLM = { "role": "system", "content": "You are a specialized weather orchestrator..." };
    const messages : any[] = typeof input === "string" ? [fuckGeminiTheShittiestLLM, {role: "user", content: input}] 
                    : [fuckGeminiTheShittiestLLM, ...input.messages] 
      
      const qwen2bObject = {
            "model": "qwen2.5:3b",
            "messages":messages,
            "stream": false,
            "tools": mappedTools
        }
    const getExecutionPlan = async () : Promise<{ message?: { tool_calls?: any } }> => {
        // console.log("QWEN OBJECT:", JSON.stringify(qwen2bObject, null, 2));
        const agentResponse = await httpGateway.fetchData("http://localhost:11434/api/chat", "POST", qwen2bObject);
        // console.log(qwen2bObject)
        return agentResponse.json().then((data) => {
            // console.log(data)
            return data
        }); 
    }
    return await getExecutionPlan();
}
}       