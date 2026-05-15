import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { mcpClient } from '../mcp/mcpClient'
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { server } from '../mcp/mcpServer'



 class startServer {
    private app = express()
    private port = process.env.PORT || 3000
    constructor() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(rateLimit({ windowMs: 60000, limit: 10 }))
    }
    private apiWeathter = async () => {
        this.app.post('/api/weather', async (req, res) => {
            console.log('Received request at /api/weather with body:', req.body);
            if (!req.body.question) {
                return res.status(400).json({ error: 'Question is required in the request body.' });
            }
            console.log('Received weather request with body:', req.body);
            const { question } = req.body;
            try {
                const result = await mcpClient.executeOrchestratedFlow({ type: "init", question: question }, "production", "qwen/qwen3-32b");
                res.send(result);
            } catch (error) {
                console.error('Error executing MCP flow:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    private apiListen = async () => {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
        try {
        // await mcpClient.connection()   
        } catch (error) {
            console.error('Error connecting MCP client:', error);
        }
    }
    private apiMCP = async () => {
       this.app.post('/mcp', async (req, res) => {
       const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true,
        });
        res.on("close", () => transport.close());
        await server.connect(transport)
        await transport.handleRequest(req, res, req.body);
      });
    }
    async expressServer() {
        await this.apiWeathter();
        await this.apiMCP();
        await this.apiListen();
    }
}
export const serverInstance = new startServer().expressServer()



