import {test, expect} from "@playwright/test";
import {WeatherOrchestrator} from "../src/WeatherOrchestrator";
import {MCPClient} from "../src/mcp/mcpClient";
import {HttpGateway} from "../src/CentralGateway";

const mcpClient = new MCPClient();
const httpGateway = new HttpGateway();

test('Weather Flow', async () => {
  const orchestrator = new WeatherOrchestrator(mcpClient, httpGateway);
  const { name, args } = await orchestrator.getExecutionPlan("Weather in Virginia?");
  const result = await mcpClient.getTools(name, args);
  expect(result.content[0].text).toContain("Alerts");
});