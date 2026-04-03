import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { alertsTable } from './repository'; // Adjust the path based on where Repository is defined

const db = drizzle(process.env.DATABASE_URL!);

export class Repository {
 static async pushAlerts(cleaned: typeof alertsTable.$inferInsert[]) {
    await db.insert(alertsTable).values(cleaned).onConflictDoNothing();
  }
  static async getAlerts() {
    const users = await db.select().from(alertsTable);
    console.log('Getting all alerts from the database: ', users);
    return users;
  }
} 