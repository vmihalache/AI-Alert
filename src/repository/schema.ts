import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { alertsTable, statesTable } from './repository'; // Adjust the path based on where Repository is defined
import states from './States3.json'
import { eq, sql } from   "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

export class Repository {
 static async pushAlerts(cleaned: typeof alertsTable.$inferInsert[]) {
    await db.insert(alertsTable).values(cleaned).onConflictDoNothing();
  }
  static async getAlerts() {
    const users = await db.select().from(alertsTable);
    // console.log('Getting all alerts from the database: ', users);
    return users;
  }
  static async seedDbWithStates() {
    await db.insert(statesTable).values(Object.entries(states).map(([code, name]) => ({ code, name }))).onConflictDoNothing();
  }
  static async getCodes(ollama_input: string) {
  return db
    .select({
      statesCode: statesTable.code,
    })
    .from(statesTable)
    .where(eq(sql`{lower({statesTable.name})}`, ollama_input))
}   
} 