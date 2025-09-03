import formidable from "formidable";
import path from "path";
import connectDB from "../../src/app/lib/db";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  

const form = formidable({
  uploadDir: path.join(process.cwd(), "public/uploads"),
  keepExtensions: true,
});


  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parse error:", err);
      return res.status(500).json({ error: "File upload failed" });
    }

    try {
      const { name, address, city, state, contact, email_id } = fields;
      const image = files.image ? `/uploads/${files.image.newFilename}` : null;

      const db = await connectDB();
      await db.execute(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, image, email_id]
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error inserting school:", error);
      return res.status(500).json({ error: "Database error" });
    }
  });
}
