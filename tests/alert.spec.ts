import {test, expect} from "@playwright/test";
import {mcpClient} from "../src/mcp/mcpClient";

test('Weather Flow', async () => {
  test.setTimeout(300000);
  await mcpClient.connection();
  const location = "Virginia"
  const question = `What is the weather in ${location}?`
  const weatherKeywords = ["alert", "warning", "weather", "forecast", "temperature", "conditions", "active",  "fire", "wildfire", "danger", "risk", "humidity", "wind", "burn", "ignite"]
  const result = await mcpClient.executeOrchestratedFlow({ type: "init", question: question })
  const containsWeatherKeyword = weatherKeywords.some(keyword => result.message?.content?.toLowerCase().includes(keyword))
  console.log("result")
  console.log(result);
  expect(result).toBeDefined() 
  expect(result.message?.content?.length).toBeGreaterThan(0)
  expect(containsWeatherKeyword).toBe(true)
  expect(result.message?.content).toContain(location)
},);       