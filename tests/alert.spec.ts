import { test } from '@playwright/test';
import {httpGateway} from '../src/CentralGateway';
import { McpFacade } from '../src/mcp/mcpFacade';
import { main } from '../src/mcp/mcpServer';
import { MCPClient } from '../src/mcp/mcpClient';

test('calls qwen2.5:3b', async () => {
const mcpClient = new MCPClient();
await mcpClient.connection();
const toolResponse = await mcpClient.client.listTools();
const mappedTools = toolResponse.tools.map((t: { name: any; description?: any; inputSchema: any; }) => ({
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
    { "role": "user", "content": "What is the weather in Virginia?" }
  ],
  "stream": false,
  "tools": mappedTools
}

await httpGateway.fetchData("http://localhost:11434/api/chat", "POST", qwen2bObject)
  .then((res) => res.json())
  .then((data) => {
    console.log("Response data:", data);
});
});