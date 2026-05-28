import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { alertsTable, statesTable } from './repository'; // Adjust the path based on where Repository is defined
import states from './States3.json'
import { eq } from   "drizzle-orm";

const db = drizzle(process.env.DATABASE_URL!);

export class Repository {
 static async pushAlerts(cleaned: typeof alertsTable.$inferInsert[]) {
    await db.insert(alertsTable).values(cleaned).onConflictDoNothing();
  }
  static async getAlerts(stateCode?:any) {
    const users = await db.select().from(alertsTable).where(eq(alertsTable.stateCode, stateCode)).limit(3) 
    return users;
  }
  static async seedDbWithStates() {
    await db.insert(statesTable).values(Object.entries(states).map(([code, name]) => ({ code, name }))).onConflictDoNothing();
  }
  static async getCodes(ollama_input: string) { 
    console.log("Repository received input:", ollama_input);
    if (ollama_input.toLowerCase().includes("washington dc") || ollama_input.toLowerCase().includes("district of columbia")) {
      ollama_input = "District of Columbia";
    }
    
    try {
   const result =  await db.select({
      statesCode: statesTable.code,
    })
    .from(statesTable)
    .where(eq(statesTable.name, ollama_input))
    return result
    } catch(e) {
    throw e
}
}   
} 