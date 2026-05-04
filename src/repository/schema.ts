import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { alertsTable, statesTable } from './repository'; // Adjust the path based on where Repository is defined
import states from './States3.json'
import { eq, sql } from   "drizzle-orm";
import { PgTable } from 'drizzle-orm/pg-core';

const db = drizzle(process.env.DATABASE_URL!);

export class Repository {
 static async pushAlerts(cleaned: typeof alertsTable.$inferInsert[]) {
    await db.insert(alertsTable).values(cleaned).onConflictDoNothing();
  }
  static async getAlerts(stateCode?:any) {
    const users = await db.select().from(alertsTable).where(eq(alertsTable.stateCode, stateCode) ) 
    // console.log('Getting all alerts from the database: ', users);
    return users;
  }
  static async seedDbWithStates() {
    await db.insert(statesTable).values(Object.entries(states).map(([code, name]) => ({ code, name }))).onConflictDoNothing();
  }
  static async getCodes(ollama_input: string) { 
    console.error("DATABASE_URL:", process.env.DATABASE_URL)
    console.error("getCodes called with:", JSON.stringify(ollama_input))
    // const dbName = await db.execute(sql`SELECT current_database()`);
    // console.error("DEBUG: THE DB I AM ACTUALLY HITTING IS:", dbName);
    try {
   const result =  await db.select({
      statesCode: statesTable.code,
    })
    .from(statesTable)
    .where(eq(statesTable.name, ollama_input))
    console.error("getCodes result:", JSON.stringify(result))
    return result
    } catch(e) {
    console.error("getCodes error:", e)
    throw e
}
}   
} 