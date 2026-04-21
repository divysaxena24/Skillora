import { db } from '../../../db';
import { users } from '../../../db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email || !name) {
      return Response.json({ error: 'Email and name are strictly required' }, { status: 400 });
    }

    // Query Drizzle to see if an account using this exact email structurally exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      // User recognized, skip insert safely
      return Response.json({ 
        message: 'Account verified without replication.',
        status: 'verified',
        id: existingUser[0].id 
      });
    }

    // User missing; create and return ID instantly
    const newUser = await db.insert(users).values({
      name,
      email,
    }).returning({ insertedId: users.id });

    return Response.json({ 
      message: 'Account registered onto Postgres successfully.', 
      status: 'created', 
      id: newUser[0].insertedId 
    }, { status: 201 });

  } catch (error: any) {
    console.error('Database Sync API Failure: ', error);
    return Response.json({ error: 'Server Encountered Interruption' }, { status: 500 });
  }
}
