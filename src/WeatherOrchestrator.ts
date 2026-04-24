import {httpGateway} from "./CentralGateway";   
import { mcpClient } from "./mcp/mcpClient
type MCPTool = {
  name: string;
  description?: string;
  inputSchema: any;
};

export class WeatherOrchestrator {
    recursiveToolModel = async (messagesObject: {}): Promise<{ message?: { tool_calls?: any } }> => {
    const toolResponse = await mcpClient.client.listTools() as { tools: MCPTool[] };
    const mappedTools = toolResponse.tools.map((t) => ({
            type: "function",
            function: {
                name: t.name,
                description: t.description,
                parameters: t.inputSchema 
            }
        }))
    // const messages : any[] = [
    //             { "role": "system", "content": "You are a specialized weather orchestrator..." },
    //             { "role": "user", "content": "What is the weather in Virginia?" }
    //         ]
      const qwen2bObject = {
            "model": "qwen2.5:3b",
            "messages": messagesObject,
            "stream": false,
            "tools": mappedTools
        }
    const getExecutionPlan = async () : Promise<{ message?: { tool_calls?: any } }> => {
        const agentResponse = await httpGateway.fetchData("http://localhost:11434/api/chat", "POST", qwen2bObject);
        return agentResponse.json().then((data) => {
            return data
        }); 
    }
    return await getExecutionPlan();
}
}       