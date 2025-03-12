import { storage } from "@/utils/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import formidable from "formidable";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default parser for file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = files.file[0];
    const fs = await import("fs");
    const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage");
    const { v4: uuidv4 } = await import("uuid");

    try {
      const fileBuffer = fs.readFileSync(file.filepath);
      const uniqueFileName = `${uuidv4()}-${file.originalFilename}`;
      const fileRef = ref(storage, `uploads/${uniqueFileName}`);

      await uploadBytes(fileRef, fileBuffer);
      const downloadURL = await getDownloadURL(fileRef);

      return res.status(200).json({ url: downloadURL });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  });
}
