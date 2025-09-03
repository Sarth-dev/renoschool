import connectDB from "../../lib/db";

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    const [rows] = await db.query("SELECT * FROM schools");
    res.status(200).json(rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Database connection failed" });
  }
}
