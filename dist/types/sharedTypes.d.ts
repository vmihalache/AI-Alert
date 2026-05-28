export type NWSAlert = {
    id: string;
    severity: string;
    urgency: string;
    certainty: string;
    description: string;
    areaDesc: string;
    sent: string;
    effective: string;
    onset: string;
    expires: string;
    ends: string | null;
    instruction: string | null;
};
export type MCPTool = {
    name: string;
    description?: string;
    inputSchema: any;
};
export type MessagesObject = {
    model: string;
    messages: {
        role: string;
        content: string;
    }[];
};
export type FlowInput = {
    type: "init";
    question: string;
} | {
    type: "state";
    messages: MessagesObject;
};
//# sourceMappingURL=sharedTypes.d.ts.map