import { test } from '@playwright/test';
import {httpGateway} from '../src/CentralGateway';
import { McpFacade } from '../src/mcp/mcpFacade';
import { main } from '../src/mcp/mcpServer';
import { MCPClient } from '../src/mcp/mcpClient';

test('calls ollama', async () => {
const mcpClient = new MCPClient();
await mcpClient.connection();
const response = await mcpClient.client.listTools();
const ollamaObject = {
  "model": "gemma3:1b",
  "messages": [
    { "role": "user", "content": "What is the weather in Virginia?" }
  ],
  "stream": false,
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "mcpfacade",
        "description": "A facade for interacting with the MCP",
        "parameters": {
          "type": "object",
          "properties": {
            "state_name": { "type": "string", "description": "Full state name like Virginia" }
          },
          "required": ["state_name"]
        }
      }
    }
  ]
}

await httpGateway.fetchData("http://localhost:11434/api/chat", "POST", ollamaObject)
  .then((res) => res.json())
  .then((data) => {
    console.log("Response data:", data);
});
});