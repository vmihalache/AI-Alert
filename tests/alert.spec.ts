import {test, expect} from "@playwright/test";
import {mcpClient} from "../src/mcp/mcpClient";
  const location = "Virginia"
  const question = `What is the weather in ${location}?`
  const weatherKeywords = ["alert", "warning", "weather", "forecast", "temperature", "conditions", "active",  "fire", "wildfire", "danger", "risk", "humidity", "wind", "burn", "ignite"]
test.beforeAll(async () => {
  await mcpClient.connection();
});
const assertWeatherResponse = (response: { message?: { content?: string } }) => {
  const containsWeatherKeyword = weatherKeywords.some(keyword => response.message?.content?.toLowerCase().includes(keyword))
  console.log("Agent response:")  
  console.log(response.message?.content)
  expect(response).toBeDefined()
  expect(response.message?.content?.length).toBeGreaterThan(0)
  expect(containsWeatherKeyword).toBe(true)
  expect(response.message?.content).toContain(location)
} 
test('Weather Flow local', async () => {
  const result = await mcpClient.executeOrchestratedFlow({ type: "init", question: question }, "local", "qwen2.5:3b");
  console.log("Agent response:")
  console.log(result.message?.content)
  assertWeatherResponse(result);  
},);       

test('Weather Flow prod', async () => {
  const result = await mcpClient.executeOrchestratedFlow({ type: "init", question: question }, "production", "qwen/qwen3-32b");
  console.log("Agent response:")
  console.log(result.message?.content)
  assertWeatherResponse(result);
},); 