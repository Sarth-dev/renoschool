import connectDB  from "../../lib/db";

export default async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.execute("SELECT * FROM schools");
    console.log("Fetched schools:", rows);

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
