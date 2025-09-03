import connectDB from "@/app/lib/db";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // we disable Next's default body parser for file upload
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      const { name, address, city, state, contact, email_id } = fields;
      const image = files.image ? `/uploads/${files.image[0].newFilename}` : null;

      // Prevent undefined -> convert to null if missing
      const safeValues = [
        name?.[0] || null,
        address?.[0] || null,
        city?.[0] || null,
        state?.[0] || null,
        contact?.[0] || null,
        image,
        email_id?.[0] || null,
      ];

      try {
        const db = await connectDB();
        await db.execute(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          safeValues
        );

        return res.status(200).json({ success: true });
      } catch (dbErr) {
        console.error("DB insert error:", dbErr);
        return res.status(500).json({ error: "Database error" });
      }
    });
  } catch (err) {
    console.error("Error inserting school:", err);
    return res.status(500).json({ error: "Error inserting school" });
  }
}
