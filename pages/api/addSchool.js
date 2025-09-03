import formidable from "formidable";
import fs from "fs";
import path from "path";
import connectDB from "../../src/app/lib/db";

export const config = {
  api: {
    bodyParser: false, // ❗ disable Next body parser for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false, uploadDir: "./public/uploads", keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Form parsing error" });

      try {
        // ✅ Fix fields (take first value if it's array)
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name;
        const address = Array.isArray(fields.address) ? fields.address[0] : fields.address;
        const city = Array.isArray(fields.city) ? fields.city[0] : fields.city;
        const state = Array.isArray(fields.state) ? fields.state[0] : fields.state;
        const contact = Array.isArray(fields.contact) ? fields.contact[0] : fields.contact;
        const email_id = Array.isArray(fields.email_id) ? fields.email_id[0] : fields.email_id;

        // ✅ Fix image filename
        const image = files.image ? files.image[0].newFilename : null;

        const db = await connectDB();
        await db.execute(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, image, email_id]
        );

        return res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error inserting school:", error);
        return res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
