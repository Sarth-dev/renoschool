import { connectDB } from "../lib/db";

export default async function handler(req, res) {
  try {
    const conn = await connectDB();
    const [rows] = await conn.query("SELECT NOW() AS time");
    res.status(200).json({ dbConnected: true, serverTime: rows[0].time });
  } catch (error) {
    res.status(500).json({ dbConnected: false, error: error.message });
  }
}
