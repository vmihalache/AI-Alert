import {test, expect} from "@playwright/test";
import {mcpClient} from "../src/mcp/mcpClient";

test('Weather Flow', async () => {
  await mcpClient.connection();
  const result = await mcpClient.executeOrchestratedFlow({ type: "init", question: "What is the weather in New York?" })
  console.log("result")
  console.log(result);
});       