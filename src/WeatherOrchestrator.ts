import {httpGateway} from "./CentralGateway";   
import { mcpClient } from "./mcp/mcpClient"
import {MCPTool, MessagesObject} from "../types/sharedTypes";



export class WeatherOrchestrator {
    recursiveToolModel = async (input: string | MessagesObject): Promise<{ message?: { tool_calls?: any; content?: string; role?: string } }> => {
    const toolResponse = await mcpClient.client.listTools() as { tools: MCPTool[] };
    const mappedTools = toolResponse.tools.map((t) => ({
            type: "function",
            function: {
                name: t.name,
                description: t.description,
                parameters: t.inputSchema 
            }
        }))
    const systemMessage = { "role": "system", "content": "You are a specialized weather orchestrator..." };
    const messages : any[] = typeof input === "string" ? [systemMessage, {role: "user", content: input}] 
                    : [systemMessage, ...input.messages] 
      
      const qwen2bObject = {
            "model": "qwen2.5:3b",
            "messages":messages,
            "stream": false,
            "tools": mappedTools
        }
    const getExecutionPlan = async () : Promise<{ message?: { tool_calls?: any; content?: string; role?: string } }> => {
        const agentResponse = await httpGateway.fetchData("http://localhost:11434/api/chat", "POST", qwen2bObject);
        return agentResponse.json().then((data) => {
            return data
        }); 
    }
    return await getExecutionPlan();
}
}       