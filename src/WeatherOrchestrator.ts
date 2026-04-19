import {MCPClient} from "./mcp/mcpClient";
import {httpGateway} from "./CentralGateway";   

export class WeatherOrchestrator {
    getExecutionPlan = async () => {
        const mcpClient = new MCPClient();
        const toolResponse = await mcpClient.client.listTools();
        const mappedTools = toolResponse.tools.map((t) => ({
            type: "function",
            function: {
                name: t.name,
                description: t.description,
                parameters: t.inputSchema 
            }
        }));
        const qwen2bObject = {
            "model": "qwen2.5:3b",
            "messages": [
                { "role": "system", "content": "You are a specialized weather orchestrator..." },
                { "role": "user", "content": "What is the weather in Virginia?" }
            ],
            "stream": false,
            "tools": mappedTools
        };
        await httpGateway.fetchData("http://localhost:11434/api/chat", "POST", qwen2bObject)
        .then((res) => res.json())
        .then(async (data) => {
            console.error("Response data:", data);
            console.error("Response data:", data.message.tool_calls[0].function.name);
            console.error("TOOL CALLED:", data.message.tool_calls[0].function.name)
           const name = data.message.tool_calls[0].function.name;
           const args = data.message.tool_calls[0].function.arguments
           return [name, args]
        })
    }
}