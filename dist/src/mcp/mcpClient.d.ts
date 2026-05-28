import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { FlowInput } from "../../types/sharedTypes";
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
export declare class MCPClient {
    clientTransport: StreamableHTTPClientTransport;
    constructor();
    client: Client<{
        method: string;
        params?: {
            [x: string]: unknown;
            _meta?: {
                [x: string]: unknown;
                progressToken?: string | number | undefined;
                "io.modelcontextprotocol/related-task"?: {
                    taskId: string;
                } | undefined;
            } | undefined;
        } | undefined;
    }, {
        method: string;
        params?: {
            [x: string]: unknown;
            _meta?: {
                [x: string]: unknown;
                progressToken?: string | number | undefined;
                "io.modelcontextprotocol/related-task"?: {
                    taskId: string;
                } | undefined;
            } | undefined;
        } | undefined;
    }, {
        [x: string]: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
    }>;
    connection: () => Promise<void>;
    getPrompts: () => Promise<{
        [x: string]: unknown;
        prompts: {
            name: string;
            description?: string | undefined;
            arguments?: {
                name: string;
                description?: string | undefined;
                required?: boolean | undefined;
            }[] | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
            icons?: {
                src: string;
                mimeType?: string | undefined;
                sizes?: string[] | undefined;
                theme?: "light" | "dark" | undefined;
            }[] | undefined;
            title?: string | undefined;
        }[];
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
        nextCursor?: string | undefined;
    }>;
    getPrompt: (name: string, args: any) => Promise<{
        [x: string]: unknown;
        messages: {
            role: "user" | "assistant";
            content: {
                type: "text";
                text: string;
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                type: "image";
                data: string;
                mimeType: string;
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                type: "audio";
                data: string;
                mimeType: string;
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                type: "resource";
                resource: {
                    uri: string;
                    text: string;
                    mimeType?: string | undefined;
                    _meta?: Record<string, unknown> | undefined;
                } | {
                    uri: string;
                    blob: string;
                    mimeType?: string | undefined;
                    _meta?: Record<string, unknown> | undefined;
                };
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                uri: string;
                name: string;
                type: "resource_link";
                description?: string | undefined;
                mimeType?: string | undefined;
                size?: number | undefined;
                annotations?: {
                    audience?: ("user" | "assistant")[] | undefined;
                    priority?: number | undefined;
                    lastModified?: string | undefined;
                } | undefined;
                _meta?: {
                    [x: string]: unknown;
                } | undefined;
                icons?: {
                    src: string;
                    mimeType?: string | undefined;
                    sizes?: string[] | undefined;
                    theme?: "light" | "dark" | undefined;
                }[] | undefined;
                title?: string | undefined;
            };
        }[];
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
        description?: string | undefined;
    }>;
    getResources: () => Promise<{
        [x: string]: unknown;
        resources: {
            uri: string;
            name: string;
            description?: string | undefined;
            mimeType?: string | undefined;
            size?: number | undefined;
            annotations?: {
                audience?: ("user" | "assistant")[] | undefined;
                priority?: number | undefined;
                lastModified?: string | undefined;
            } | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
            icons?: {
                src: string;
                mimeType?: string | undefined;
                sizes?: string[] | undefined;
                theme?: "light" | "dark" | undefined;
            }[] | undefined;
            title?: string | undefined;
        }[];
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
        nextCursor?: string | undefined;
    }>;
    getResource: (uri: string) => Promise<{
        [x: string]: unknown;
        contents: ({
            uri: string;
            text: string;
            mimeType?: string | undefined;
            _meta?: Record<string, unknown> | undefined;
        } | {
            uri: string;
            blob: string;
            mimeType?: string | undefined;
            _meta?: Record<string, unknown> | undefined;
        })[];
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
    }>;
    getTools: (toolName: string, toolArguments: {}) => Promise<{
        [x: string]: unknown;
        content: ({
            type: "text";
            text: string;
            annotations?: {
                audience?: ("user" | "assistant")[] | undefined;
                priority?: number | undefined;
                lastModified?: string | undefined;
            } | undefined;
            _meta?: Record<string, unknown> | undefined;
        } | {
            type: "image";
            data: string;
            mimeType: string;
            annotations?: {
                audience?: ("user" | "assistant")[] | undefined;
                priority?: number | undefined;
                lastModified?: string | undefined;
            } | undefined;
            _meta?: Record<string, unknown> | undefined;
        } | {
            type: "audio";
            data: string;
            mimeType: string;
            annotations?: {
                audience?: ("user" | "assistant")[] | undefined;
                priority?: number | undefined;
                lastModified?: string | undefined;
            } | undefined;
            _meta?: Record<string, unknown> | undefined;
        } | {
            type: "resource";
            resource: {
                uri: string;
                text: string;
                mimeType?: string | undefined;
                _meta?: Record<string, unknown> | undefined;
            } | {
                uri: string;
                blob: string;
                mimeType?: string | undefined;
                _meta?: Record<string, unknown> | undefined;
            };
            annotations?: {
                audience?: ("user" | "assistant")[] | undefined;
                priority?: number | undefined;
                lastModified?: string | undefined;
            } | undefined;
            _meta?: Record<string, unknown> | undefined;
        } | {
            uri: string;
            name: string;
            type: "resource_link";
            description?: string | undefined;
            mimeType?: string | undefined;
            size?: number | undefined;
            annotations?: {
                audience?: ("user" | "assistant")[] | undefined;
                priority?: number | undefined;
                lastModified?: string | undefined;
            } | undefined;
            _meta?: {
                [x: string]: unknown;
            } | undefined;
            icons?: {
                src: string;
                mimeType?: string | undefined;
                sizes?: string[] | undefined;
                theme?: "light" | "dark" | undefined;
            }[] | undefined;
            title?: string | undefined;
        })[];
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
        structuredContent?: Record<string, unknown> | undefined;
        isError?: boolean | undefined;
    } | {
        [x: string]: unknown;
        toolResult: unknown;
        _meta?: {
            [x: string]: unknown;
            progressToken?: string | number | undefined;
            "io.modelcontextprotocol/related-task"?: {
                taskId: string;
            } | undefined;
        } | undefined;
    }>;
    executeOrchestratedFlow: (input: FlowInput, environment: string, model: string, history?: {
        role: string;
        content: string;
        tool_call_id?: string;
    }[]) => Promise<{
        choices: [];
        message?: {
            tool_calls?: any;
            content?: string;
            role?: string;
        };
    }>;
}
export declare const mcpClient: MCPClient;
//# sourceMappingURL=mcpClient.d.ts.map