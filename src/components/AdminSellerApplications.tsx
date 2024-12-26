import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminSellerApplications.css';
interface Application {
  id: number;
  userId: number;
  applicationDate: string;
  supplierName: string;
  supplierEstablishmentDate: string;
  supplierPrimaryContact: string;
  supplierSecondaryContact: string;
  supplierEmail: string;
  supplierAddress: string;
  supplierCity: string;
  supplierState: string;
  supplierCountry: string;
  supplierZipCode: string;
  status: string;
  businessDetails: string;
}

const AdminSellerApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch all seller applications
  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get<Application[]>(
        "https://pretiosusapi.gibsonline.com/api/Supplier/applications"
      );
      setApplications(response.data);
    } catch (err) {
      setError("Failed to fetch seller applications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Approve a seller application
  const approveApplication = async (applicationId: number) => {
    try {
      await axios.put(
        `https://pretiosusapi.gibsonline.com/api/Supplier/applications/${applicationId}`,
        { status: "Approved" }
      );
      alert("Application approved successfully!");
      // Update the application status locally
      setApplications((prev) =>
        prev.map((application) =>
          application.id === applicationId
            ? { ...application, status: "Approved" }
            : application
        )
      );
    } catch (err) {
      alert("Failed to approve the application. Please try again.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="admin-seller-applications">
      <div className="admin-seller-applications-container">
        <h1 className="admin-header">Seller Applications</h1>
        {loading ? (
          <p className="admin-message">Loading applications...</p>
        ) : error ? (
          <p className="admin-error-message">{error}</p>
        ) : applications.length === 0 ? (
          <p className="admin-message">No applications found.</p>
        ) : (
          <table className="admin-seller-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Name</th>
                <th>Email</th>
                <th>City</th>
                <th>State</th>
                <th>Country</th>
                <th>Business Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.supplierName}</td>
                  <td>{app.supplierEmail}</td>
                  <td>{app.supplierCity}</td>
                  <td>{app.supplierState}</td>
                  <td>{app.supplierCountry}</td>
                  <td title={app.businessDetails}>
                    {app.businessDetails.length > 50
                      ? app.businessDetails.slice(0, 50) + "..."
                      : app.businessDetails}
                  </td>
                  <td>{app.status}</td>
                  <td>
                    {app.status !== "Approved" ? (
                      <button
                        onClick={() => approveApplication(app.id)}
                        className="admin-approve-button"
                      >
                        Approve
                      </button>
                    ) : (
                      <span style={{ color: "gray" }}>Approved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSellerApplications;
