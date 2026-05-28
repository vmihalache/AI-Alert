"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const mcpClient_1 = require("../src/mcp/mcpClient");
const location = "Virginia";
const question = `What is the weather in ${location}?`;
const weatherKeywords = ["alert", "warning", "weather", "forecast", "temperature", "conditions", "active", "fire", "wildfire", "danger", "risk", "humidity", "wind", "burn", "ignite"];
test_1.test.beforeAll(async () => {
    await mcpClient_1.mcpClient.connection();
});
const assertWeatherResponse = (response) => {
    const containsWeatherKeyword = weatherKeywords.some(keyword => response.message?.content?.toLowerCase().includes(keyword));
    console.log("Agent response:");
    console.log(response.message?.content);
    (0, test_1.expect)(response).toBeDefined();
    (0, test_1.expect)(response.message?.content?.length).toBeGreaterThan(0);
    (0, test_1.expect)(containsWeatherKeyword).toBe(true);
    (0, test_1.expect)(response.message?.content).toContain(location);
};
(0, test_1.test)('Weather Flow local', async () => {
    const result = await mcpClient_1.mcpClient.executeOrchestratedFlow({ type: "init", question: question }, "local", "qwen2.5:3b");
    console.log("Agent response:");
    console.log(result.message?.content);
    assertWeatherResponse(result);
});
(0, test_1.test)('Weather Flow prod', async () => {
    const result = await mcpClient_1.mcpClient.executeOrchestratedFlow({ type: "init", question: question }, "production", "qwen/qwen3-32b");
    console.log("Agent response:");
    console.log(result.message?.content);
    assertWeatherResponse(result);
});
//# sourceMappingURL=alert.spec.js.map