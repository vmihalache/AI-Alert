import { McpGateway } from "./mcpGateway";
export declare class McpFacade {
    mcpGateway: McpGateway;
    getCodesForState(state_name: string): Promise<string | undefined>;
    ingestAlertsForState(state_code: string): Promise<{
        id: string;
        severity: string | null;
        urgency: string | null;
        certainty: string | null;
        description: string | null;
        areaDesc: string | null;
        sent: string | null;
        effective: string | null;
        onset: string | null;
        expires: string | null;
        ends: string | null;
        instruction: string | null;
        stateCode: string | null;
    }[] | {
        description: string;
    } | undefined>;
}
//# sourceMappingURL=mcpFacade.d.ts.map