import {httpGateway} from "./CentralGateway";   
import { mcpClient } from "./mcp/mcpClient"
import {MCPTool, MessagesObject} from "../types/sharedTypes";
import 'dotenv/config';



export class WeatherOrchestrator {
    recursiveToolModel = async (input: string | MessagesObject, environment: string, model: string): Promise<{ message?: { tool_calls?: any; content?: string; role?: string } }> => {
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
            "model": model,
            "messages":messages,
            "stream": false,
            "tools": mappedTools,
            "reasoning_effort": "none"
        }
    const getExecutionPlan = async (environmentUrl: string, headers?: {}) : Promise<{ message?: { tool_calls?: any; content?: string; role?: string } }> => {
        console.log(environmentUrl)
        console.log(environment)
        const agentResponse = await httpGateway.fetchData(environmentUrl, "POST", qwen2bObject, headers);
        return agentResponse.json().then((data) => {
            // console.log("Agent response:")
            // console.log(data)
            const alteredData = environment === "production" ? data.choices[0].message : data.message
            return { message: alteredData };
        })
    }
    if (environment === "production") {
    return await getExecutionPlan(process.env.ProdEndpoint!, {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY!}`
    });
    } else {
        environment = "local"
    return await getExecutionPlan(process.env.LocalEndpoint!)
}
}       
}