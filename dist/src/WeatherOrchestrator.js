"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherOrchestrator = void 0;
const CentralGateway_1 = require("./CentralGateway");
const mcpClient_1 = require("./mcp/mcpClient");
class WeatherOrchestrator {
    recursiveToolModel = async (input, environment, model) => {
        const toolResponse = await mcpClient_1.mcpClient.client.listTools();
        const mappedTools = toolResponse.tools.map((t) => ({
            type: "function",
            function: {
                name: t.name,
                description: t.description,
                parameters: t.inputSchema
            }
        }));
        const systemMessage = { "role": "system", "content": "You are a specialized weather orchestrator..." };
        const messages = typeof input === "string" ? [systemMessage, { role: "user", content: input }]
            : [systemMessage, ...input.messages];
        const qwen2bObject = {
            "model": "qwen/qwen3-32b",
            "messages": messages,
            "stream": false,
            "tools": mappedTools
        };
        const getExecutionPlan = async () => {
            const agentResponse = await CentralGateway_1.httpGateway.fetchData(process.env.ProdEndpoint ?? "http://localhost:11434/api/chat", "POST", qwen2bObject);
            return agentResponse.json().then((data) => {
                return data;
            });
        };
        return await getExecutionPlan();
    };
}
exports.WeatherOrchestrator = WeatherOrchestrator;
//# sourceMappingURL=WeatherOrchestrator.js.map