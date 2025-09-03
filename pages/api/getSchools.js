import connectDB from "../../src/app/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const db = await connectDB();
    const [rows] = await db.execute("SELECT * FROM schools");
    await db.end();

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching schools:", err);
    return res.status(500).json({ message: "Error fetching schools" });
  }
}
