import React, { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  typeId: number;
  name: string;
  description: string;
  costPrice: number;
  markup: number;
  price: number;
  reorderLevel: number;
  imageUrl: string;
  supplierId: number;
  createdAt: string;
  status: string;
}

const ProductRequests: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Product[]>(
        "https://localhost:7242/api/Products/allrequest"
      );
      setProducts(response.data);
    } catch (error) {
      setMessage("Failed to fetch product uploads. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id: number, isApproved: boolean) => {
    try {
      await axios.put(
        `https://localhost:7242/api/Products/approve-or-reject?requestId=${id}&isApproved=${isApproved}`
      );
      setMessage(
        `Product ${isApproved ? "Approved" : "Rejected"} successfully!`
      );
      // Update the product's status in the state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, status: isApproved ? "Approved" : "Rejected" }
            : product
        )
      );
    } catch (error) {
      console.error(error);
      setMessage("Failed to update product status. Please try again later.");
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f0f8ff",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          color: "#1E90FF",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Product Upload Requests
      </h2>
      {message && (
        <p
          style={{
            textAlign: "center",
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search by name or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />
      </div>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No product requests found.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Price</th>
                <th style={tableHeaderStyle}>Image</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td style={tableCellStyle}>{product.id}</td>
                  <td style={tableCellStyle}>{product.name}</td>
                  <td style={tableCellStyle}>
                    <span
                      title={product.description}
                      style={{ cursor: "pointer" }}
                    >
                      {product.description.length > 50
                        ? product.description.substring(0, 50) + "..."
                        : product.description}
                    </span>
                  </td>
                  <td style={tableCellStyle}>${product.price.toFixed(2)}</td>
                  <td style={tableCellStyle}>
                  <img
  src={`https://localhost:7242/uploads/${product.imageUrl}`}
  alt={product.name}
  style={{
    width: "100px",
    height: "auto",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "transform 1.0s ease-in-out", // Smooth hover effect
  }}
  onMouseEnter={(e) => {
    const img = e.currentTarget;
    img.style.transform = "scale(5)"; // Make image twice as large
  }}
  onMouseLeave={(e) => {
    const img = e.currentTarget;
    img.style.transform = "scale(1)"; // Restore to original size
  }}
/>
                  </td>
                  <td style={tableCellStyle}>{product.status}</td>
                  <td style={tableCellStyle}>
                    <button
                      onClick={() => handleApproval(product.id, true)}
                      style={approveButtonStyle}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleApproval(product.id, false)}
                      style={rejectButtonStyle}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style={paginationArrowStyle}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                style={{
                  padding: "8px 12px",
                  margin: "0 5px",
                  border: "1px solid #1E90FF",
                  backgroundColor: currentPage === index + 1 ? "#1E90FF" : "#fff",
                  color: currentPage === index + 1 ? "#fff" : "#1E90FF",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              style={paginationArrowStyle}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  backgroundColor: "#1E90FF",
  color: "#fff",
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
};

const tableCellStyle: React.CSSProperties = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

const approveButtonStyle: React.CSSProperties = {
  backgroundColor: "green",
  color: "#fff",
  padding: "5px 10px",
  marginRight: "5px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const rejectButtonStyle: React.CSSProperties = {
  backgroundColor: "red",
  color: "#fff",
  padding: "5px 10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

const paginationArrowStyle: React.CSSProperties = {
  padding: "8px 12px",
  margin: "0 5px",
  border: "1px solid #1E90FF",
  backgroundColor: "#fff",
  color: "#1E90FF",
  borderRadius: "4px",
  cursor: "pointer",
};

export default ProductRequests;
