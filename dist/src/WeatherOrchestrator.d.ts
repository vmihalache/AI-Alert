import { MessagesObject } from "../types/sharedTypes";
export declare class WeatherOrchestrator {
    recursiveToolModel: (input: string | MessagesObject, environment: any, model: string) => Promise<{
        choices: any;
        message?: {
            tool_calls?: any;
            content?: string;
            role?: string;
        };
    }>;
}
//# sourceMappingURL=WeatherOrchestrator.d.ts.map