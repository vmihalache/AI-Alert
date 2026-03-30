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
}