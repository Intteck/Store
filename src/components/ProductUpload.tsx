import React, { useState } from "react";
import axios from "axios";

const ProductUpload: React.FC = () => {
  const [typeName, setTypeName] = useState<string>("");
  const [supplierId, setSupplierId] = useState<number | "">("");
  const [markup, setMarkup] = useState<number | "">("");
  const [reorderLevel, setReorderLevel] = useState<number | "">("");
  const [name, setName] = useState<string>("");
  const [costPrice, setCostPrice] = useState<number | "">("");
  const [description, setDescription] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      setMessage("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("TypeName", typeName);
    formData.append("SupplierId", supplierId.toString());
    formData.append("Markup", markup.toString());
    formData.append("ReorderLevel", reorderLevel.toString());
    formData.append("Name", name);
    formData.append("imageFile", imageFile);
    formData.append("ImageFileName", imageFile.name); // Explicitly add the image file name
    formData.append("CostPrice", costPrice.toString());
    formData.append("Description", description);

    try {
      const response = await axios.post(
        "https://localhost:7242/api/Products/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Product uploaded successfully!");
    } catch (error) {
      setMessage("Error uploading product. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f0f8ff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <h2 style={{ color: "#1E90FF", textAlign: "center", marginBottom: "20px" }}>Upload Product</h2>
      {message && <p style={{ textAlign: "center", color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Type Name:</label>
          <select
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option value="">Select Type</option>
            <option value="Tvs">Tvs</option>
            <option value="Refrigerators">Refrigerators</option>
            <option value="Freezers">Freezers</option>
            <option value="Air Conditioners">Air Conditioners</option>
            <option value="Washing Machines">Washing Machines</option>
            <option value="Microwaves Oven">Microwaves Oven</option>
            <option value="Small Home Appliances">Small Home Appliances</option>
            <option value="Phones">Phones</option>
            <option value="Accessories">Accessories</option>
            <option value="Laptops">Laptops</option>
            <option value="Airpods">Airpods</option>
            <option value="IPADS">IPADS</option>
            <option value="SmartWatch">SmartWatch</option>
            <option value="Playstation Console">Playstation Console</option>
            <option value="Shoes">Shoes</option>
            <option value="Consumables">Consumables</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Supplier ID:</label>
          <input
            type="number"
            value={supplierId}
            onChange={(e) => setSupplierId(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Markup:</label>
          <input
            type="number"
            value={markup}
            onChange={(e) => setMarkup(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Reorder Level:</label>
          <input
            type="number"
            value={reorderLevel}
            onChange={(e) => setReorderLevel(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Cost Price:</label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(Number(e.target.value))}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", height: "100px" }}
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px", color: "#333" }}>Product Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            style={{ display: "block", marginBottom: "10px" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#1E90FF",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Upload Product
        </button>
      </form>
    </div>
  );
};

export default ProductUpload;
