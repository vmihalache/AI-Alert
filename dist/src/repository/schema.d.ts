import 'dotenv/config';
import { alertsTable } from './repository';
export declare class Repository {
    static pushAlerts(cleaned: typeof alertsTable.$inferInsert[]): Promise<void>;
    static getAlerts(stateCode?: any): Promise<{
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
    }[]>;
    static seedDbWithStates(): Promise<void>;
    static getCodes(ollama_input: string): Promise<{
        statesCode: string;
    }[]>;
}
//# sourceMappingURL=schema.d.ts.map