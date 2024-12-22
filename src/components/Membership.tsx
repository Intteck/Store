import React, { useState } from "react";
import "./Membership.css"
import Nav from "./Nav";

interface Props {
  data: [customerDetails: CustomerDetails, Products: ProductItem[] | null];
}

type ProductItem = {
  id: number;
  name: string;
  description: string;
  image_URL: string;
  product_Type: productType[];
  price: number;
  suppliers: [];
};

type productType = {
  id: number;
  name: string;
  description: string;
};

type CustomerDetails = {
  id: number;
  first_name: string;
  last_name: string;
  dob: string;
  email: string;
  phone_number: string;
  address: string;
  country: string;
  postalCode: string;
  state: string;
  city: string;
  wallet_amt: number;
  wishlist: string[];
};

const Membership = (props: Props) => {
  const { data } = props;
  const [customerDetails, Products] = data;
  const [supplierDetails, setSupplierDetails] = useState({
    userId: customerDetails.id,
    supplierName: customerDetails.first_name+" "+customerDetails.last_name,
    supplierEstablishmentDate: new Date().toISOString(),
    supplierPrimaryContact: customerDetails.phone_number,
    supplierSecondaryContact: "",
    supplierEmail: customerDetails.email,
    supplierAddress: customerDetails.address,
    supplierCity: customerDetails.city,
    supplierState: customerDetails.state,
    supplierCountry: customerDetails.country,
    supplierZipCode: customerDetails.postalCode,
    businessDetails: "",
  });

const handleApplication = ()=>{
console.log(JSON.stringify(supplierDetails));

    fetch("https://pretiosusapi.gibsonline.com/api/Supplier/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplierDetails),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(`Failed to send details. ${error.message}`);
          });
        }
      })
      .then((data) => {
        console.log("Application has been sent", data);
      })
      .catch((error) => {
        console.error("Error sending info:", error);
      });
}


  return (
    <>
      <Nav data={[customerDetails, Products]} />
      <div className="membership-container">
        <h1 className="membership-title">Become a Vendor</h1>

        <div className="vendor-form-container">
          <h2 className="vendor-title">Fill out form</h2>
          <p className="vendor-description">
            Interested? Send us your application!
          </p>
          <form className="vendor-form" method="post">
            <div data-aos="fade-up" data-aos-duration="1000">
              <span>Primary Contact</span>
              <input
                type="tel"
                name="supplierPrimaryContact"
                pattern="(\+234|\b0)\d{10}"
                value={customerDetails.phone_number}
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    supplierPrimaryContact: e.target.value,
                  })
                }
                placeholder="(0)+234-856-7890-965"
                required
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              <span>Secondary Contact</span>
              <input
                type="tel"
                name="supplierSecondaryContact"
                value={supplierDetails.supplierSecondaryContact}
                pattern="(\+234|\b0)\d{10}"
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    supplierSecondaryContact: e.target.value,
                  })
                }
                placeholder="(0)+234-856-7890-965"
                required
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <span>Email Address</span>
              <input
                type="email"
                value={customerDetails.email}
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    supplierEmail: e.target.value,
                  })
                }
                name="supplierEmail"
                placeholder="Enter Email Address"
                required
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <span>Address</span>
              <input
                type="text"
                name="supplierAddress"
                value={customerDetails.address}
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    supplierAddress: e.target.value,
                  })
                }
                placeholder="Enter Address"
                required
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <span>City</span>
              <input
                type="text"
                name="supplierCity"
                value={customerDetails.city}
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    supplierCity: e.target.value,
                  })
                }
                placeholder="Enter City"
                required
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <span>State</span>
              <input
                type="text"
                name="supplierState"
                value={customerDetails.state}
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    supplierState: e.target.value,
                  })
                }
                placeholder="Enter State"
                required
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <span>Country</span>
              <input
                type="text"
                name="supplierCountry"
                value={customerDetails.country}
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    supplierCountry: e.target.value,
                  })
                }
                placeholder="Enter Country"
                required
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              <span>Postal Code</span>
              <input
                type="text"
                name="supplierZipCode"
                value={customerDetails.postalCode}
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    supplierZipCode: e.target.value,
                  })
                }
                placeholder="Enter Postal Code"
                required
              />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <span>Business Details</span>
              <textarea
                name="businessDetails"
                cols={30}
                rows={10}
                value={supplierDetails.businessDetails}
                onChange={(e) =>
                  setSupplierDetails({
                    ...supplierDetails,
                    businessDetails: e.target.value,
                  })
                }
                placeholder="Provide details about your business"
                required
              ></textarea>
            </div>

            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              <button
                className="vendor-btn"
                onClick={(e) => {
                  handleApplication();
                  e.preventDefault();
                }}
              >
                Send Application
                <img src="\src\assets\Arrow.png" alt="" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Membership;