"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInstance = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const mcpClient_1 = require("../mcp/mcpClient");
const streamableHttp_js_1 = require("@modelcontextprotocol/sdk/server/streamableHttp.js");
const mcpServer_1 = require("../mcp/mcpServer");
class startServer {
    app = (0, express_1.default)();
    port = process.env.PORT || 3000;
    constructor() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_rate_limit_1.default)({ windowMs: 60000, limit: 10 }));
    }
    apiWeathter = async () => {
        this.app.post('/api/weather', async (req, res) => {
            console.log('Received request at /api/weather with body:', req.body);
            if (!req.body.question) {
                return res.status(400).json({ error: 'Question is required in the request body.' });
            }
            console.log('Received weather request with body:', req.body);
            const { question } = req.body;
            try {
                const result = await mcpClient_1.mcpClient.executeOrchestratedFlow({ type: "init", question: question }, "production", "qwen/qwen3-32b");
                res.send(result);
            }
            catch (error) {
                console.error('Error executing MCP flow:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    };
    apiListen = async () => {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
        try {
            await mcpClient_1.mcpClient.connection();
        }
        catch (error) {
            console.error('Error connecting MCP client:', error);
        }
    };
    apiMCP = async () => {
        this.app.post('/mcp', async (req, res) => {
            const transport = new streamableHttp_js_1.StreamableHTTPServerTransport({
                sessionIdGenerator: undefined,
                enableJsonResponse: true,
            });
            res.on("close", () => transport.close());
            await mcpServer_1.server.connect(transport);
            await transport.handleRequest(req, res, req.body);
        });
    };
    async expressServer() {
        await this.apiWeathter();
        await this.apiMCP();
        await this.apiListen();
    }
}
exports.serverInstance = new startServer().expressServer();
//# sourceMappingURL=express.js.map