import {MCPClient} from "./mcp/mcpClient";
import {httpGateway} from "./CentralGateway";   

export class WeatherOrchestrator {
    recursiveToolModel = async (messagesObject: {}): Promise<{ message?: { tool_calls?: any } }> => {
    const mcpClient = new MCPClient();
    const toolResponse = await mcpClient.client.listTools();
    const mappedTools = toolResponse.map((t) => ({
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
    const getExecutionPlan = async () : Promise<any[]> => {
        const agentResponse = await httpGateway.fetchData("http://localhost:11434/api/chat", "POST", qwen2bObject);
        return agentResponse.json().then((data) => {
            return data
    }
    )}
    return await getExecutionPlan();
}
}       