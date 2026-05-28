"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statesTable = exports.alertsTable = void 0;
require("dotenv/config");
const pg_core_1 = require("drizzle-orm/pg-core");
exports.alertsTable = (0, pg_core_1.pgTable)("alerts", {
    id: (0, pg_core_1.text)('id').primaryKey(),
    severity: (0, pg_core_1.text)('severity'),
    urgency: (0, pg_core_1.text)('urgency'),
    certainty: (0, pg_core_1.text)('certainty'),
    description: (0, pg_core_1.text)('description'),
    areaDesc: (0, pg_core_1.text)('area_desc'),
    sent: (0, pg_core_1.text)('sent'),
    effective: (0, pg_core_1.text)('effective'),
    onset: (0, pg_core_1.text)('onset'),
    expires: (0, pg_core_1.text)('expires'),
    ends: (0, pg_core_1.text)('ends'),
    instruction: (0, pg_core_1.text)('instruction'),
    stateCode: (0, pg_core_1.text)('stateCode')
});
exports.statesTable = (0, pg_core_1.pgTable)("states", {
    name: (0, pg_core_1.text)('name'),
    code: (0, pg_core_1.text)('code').primaryKey()
});
//# sourceMappingURL=repository.js.map