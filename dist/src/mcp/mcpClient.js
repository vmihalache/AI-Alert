"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mcpClient = exports.MCPClient = void 0;
const index_js_1 = require("@modelcontextprotocol/sdk/client/index.js");
const WeatherOrchestrator_1 = require("../WeatherOrchestrator");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/client/streamableHttp.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class MCPClient {
    clientTransport;
    constructor() {
        this.clientTransport = new streamableHttp_js_1.StreamableHTTPClientTransport(new URL(process.env.MCP_URL ?? "http://localhost:3000/mcp"), {
            sessionId: undefined,
        });
    }
    client = new index_js_1.Client({
        name: "example-client",
        version: "1.0.0"
    });
    connection = async () => {
        await this.client.connect(this.clientTransport);
    };
    // List prompts
    getPrompts = async () => {
        return await this.client.listPrompts();
    };
    getPrompt = async (name, args) => {
        return await this.client.getPrompt({
            name: "example-prompt",
            arguments: {
                arg1: "value"
            }
        });
    };
    // List resources
    getResources = async () => {
        return await this.client.listResources();
    };
    // Read a resource
    getResource = async (uri) => {
        return await this.client.readResource({
            uri: uri
        });
    };
    getTools = async (toolName, toolArguments) => {
        return await this.client.callTool({
            name: toolName,
            arguments: toolArguments
        });
    };
    executeOrchestratedFlow = async (input, environment, model, history = []) => {
        console.log("Executing orchestrated flow with input:", input, "environment:", environment, "model:", model);
        const orchestrator = new WeatherOrchestrator_1.WeatherOrchestrator();
        const inputDecision = input.type === "init" ? input.question : input.messages.messages;
        const agentResponse = await orchestrator.recursiveToolModel(input.type === "init" ? input.question : input.messages, environment === "production" ? "production" : "local", model);
        history.push({ "role": "user", "content": JSON.stringify(inputDecision) });
        console.log("Agent response:", agentResponse);
        // console.log(agentResponse)
        if (!agentResponse.choices[0].message?.tool_calls) {
            return agentResponse;
        }
        else {
            const toolArgument = agentResponse.choices[0].message.tool_calls[0].function.arguments;
            console.log("Raw tool arguments:", toolArgument);
            const toolArgumentProd = environment === "production" ? JSON.parse(toolArgument) : toolArgument;
            console.log("Tool call detected. Executing tool with arguments:", toolArgumentProd);
            const toolResponse = await this.getTools(agentResponse.choices[0].message.tool_calls[0].function.name, toolArgumentProd);
            console.log("Tool response:", toolResponse);
            history.push({ "role": "assistant", "content": JSON.stringify(agentResponse.choices[0].message) });
            history.push({ "role": "tool", "content": typeof toolResponse.content === 'string' ? toolResponse.content : JSON.stringify(toolResponse.content), tool_call_id: agentResponse.choices[0].message.tool_calls[0].id });
            const toolResponseModified = {
                type: "state",
                messages: { model: model, messages: history },
            };
            return await this.executeOrchestratedFlow(toolResponseModified, environment, model, history);
        }
    };
}
exports.MCPClient = MCPClient;
exports.mcpClient = new MCPClient();
//# sourceMappingURL=mcpClient.js.map