import connectDB from "@/app/lib/db"; // cleaner import if you use `@` alias

export default async function handler(req, res) {
  try {
    const db = await connectDB();
    const [rows] = await db.execute("SELECT * FROM schools");

    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ error: "Error fetching schools" });
  }
}
