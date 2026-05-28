export declare class Ingestion {
    stateCode: string;
    constructor(stateCode: string);
    ingestDataFromWeatherAPi(): Promise<{
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
//# sourceMappingURL=Ingestion.d.ts.map