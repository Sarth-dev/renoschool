import { connectDB } from "../../lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, address, city, state, contact, image, email_id } = body;

    const db = await connectDB();
    console.log("Connecting to DB...");
    console.log("Body received:", req.body);
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id]
    );

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error inserting school:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
