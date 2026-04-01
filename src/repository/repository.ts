import 'dotenv/config'
import {pgTable, text} from "drizzle-orm/pg-core";

export const alertsTable = pgTable("alerts", {
    id: text('id').primaryKey(),
    severity: text('severity'),
    urgency: text('urgency'),
    certainty: text('certainty'),
    description: text('description'),
    areaDesc: text('area_desc'),
    sent: text('sent'),
    effective: text('effective'),
    onset: text('onset'),
    expires: text('expires'),
    ends: text('ends'),
    instruction: text('instruction')
});