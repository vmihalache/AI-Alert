import {httpGateway} from "./CentralGateway";   
import { mcpClient } from "./mcp/mcpClient"
import {MCPTool, MessagesObject} from "../types/sharedTypes";



export class WeatherOrchestrator {
    recursiveToolModel = async (input: string | MessagesObject, environment: any, model: string ): Promise<{
      choices: any; message?: { tool_calls?: any; content?: string; role?: string } 
}> => {
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
            "model": "qwen/qwen3-32b",
            "messages":messages,
            "stream": false,
            "tools": mappedTools
        }
    const getExecutionPlan = async () : Promise<{ choices: []; message?: { tool_calls?: any; content?: string; role?: string } }> => {
        const agentResponse = await httpGateway.fetchData(process.env.ProdEndpoint ?? "http://localhost:11434/api/chat", "POST", qwen2bObject);
        return agentResponse.json().then((data: { choices: []; message?: { tool_calls?: any; content?: string; role?: string } }) => {
            return data;
        });
    }
    return await getExecutionPlan();
}
}       