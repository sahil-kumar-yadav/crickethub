import { useState } from "react";
import axios from "axios";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadedUrl("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/upload", formData);
      setUploadedUrl(res.data.url);
      alert("File uploaded successfully!");
    } catch (error) {
      alert("Error uploading file.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-3">Upload Media</h2>
      <input type="file" onChange={handleFileChange} className="mb-3" />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {uploadedUrl && (
        <div className="mt-4">
          <p>Uploaded File:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            View Uploaded Media
          </a>
        </div>
      )}
    </div>
  );
}
