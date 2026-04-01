import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { alertsTable } from './Repository';

const db = drizzle(process.env.DATABASE_URL!);

export class Repository {
 static async pushAlerts(cleaned: typeof alertsTable.$inferInsert[]) {
    await db.insert(alertsTable).values(cleaned);
  }
  static async getAlerts() {
    const users = await db.select().from(alertsTable);
    console.log('Getting all alerts from the database: ', users);
    return users;
  }
} 