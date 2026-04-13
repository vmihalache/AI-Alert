import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export class MCPClient {
    serverAddress: string;
    transport: StdioClientTransport;
    
    constructor(
        serverAddress: string = ""
    ) {
        this.serverAddress = serverAddress;
        this.transport = new StdioClientTransport({
            command: "node",
            args: [this.serverAddress],
        });
    }

client = new Client(
  {
    name: "example-client",
    version: "1.0.0"
  }
);

connection = async () => {
await this.client.connect(this.transport);
}
// List prompts

getPrompts = async () => {
return await this.client.listPrompts();
}
getPrompt = async (name: string, args: any) => {
return await this.client.getPrompt({
  name: "example-prompt",
  arguments: {
    arg1: "value"
  }
});
}
// List resources
getResources = async () => {
return await this.client.listResources();
}

// Read a resource
getResource = async (uri: string) => {
return await this.client.readResource({
  uri: uri
});
}

getTools = async () => {
return await this.client.callTool({
  name: "example-tool",
  arguments: {
    arg1: "value"
  }
});
}
}