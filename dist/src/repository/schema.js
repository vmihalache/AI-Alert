"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const repository_1 = require("./repository"); // Adjust the path based on where Repository is defined
const States3_json_1 = __importDefault(require("./States3.json"));
const drizzle_orm_1 = require("drizzle-orm");
const db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL);
class Repository {
    static async pushAlerts(cleaned) {
        await db.insert(repository_1.alertsTable).values(cleaned).onConflictDoNothing();
    }
    static async getAlerts(stateCode) {
        const users = await db.select().from(repository_1.alertsTable).where((0, drizzle_orm_1.eq)(repository_1.alertsTable.stateCode, stateCode)).limit(3);
        return users;
    }
    static async seedDbWithStates() {
        await db.insert(repository_1.statesTable).values(Object.entries(States3_json_1.default).map(([code, name]) => ({ code, name }))).onConflictDoNothing();
    }
    static async getCodes(ollama_input) {
        console.log("Repository received input:", ollama_input);
        if (ollama_input.toLowerCase().includes("washington dc") || ollama_input.toLowerCase().includes("district of columbia")) {
            ollama_input = "District of Columbia";
        }
        try {
            const result = await db.select({
                statesCode: repository_1.statesTable.code,
            })
                .from(repository_1.statesTable)
                .where((0, drizzle_orm_1.eq)(repository_1.statesTable.name, ollama_input));
            return result;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.Repository = Repository;
//# sourceMappingURL=schema.js.map