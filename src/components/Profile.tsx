import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import PaystackPop from "@paystack/inline-js";
import Nav from "./Nav";
import "./Profile.css"
import Cookies from "js-cookie";
 interface Props {
   data: [customerDetails: CustomerDetails, Products: ProductItem[] | null,    
   setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>,
   role: string,
];
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
   state: string;
   city: string;
   postalCode: string;
   wallet_amt: number;
   wishlist: string[];
 };

 type ReqDetails = {
   custId:number,
   Name: string;
   Description: string;
 };


const Profile = (props: Props) => {
  const { data } = props;
          const navigate = useNavigate();
  const [customerDetails, Products,setCustomerDetails,role] = data;
    const formatter = new Intl.NumberFormat("en-US");
    console.log(role);
    
    const[updatedCustomerDetails, setUpdatedCustomerDetails]= useState(customerDetails);
    const [supplierApps,setSupplierApps] = useState<any>([""]);
    const [venReqActive, setVenReqActive] = useState(false);
    const [reqDetActive, setReqDetActive] = useState(0);
  const [askForActive, setaskForActive] = useState(false);
  const[addWalletActive, setAddWalletActive] = useState(false);
    const [addToWallet, setAddToWallet] = useState(false);
    const [reqPend, setReqPend] = useState(false);
    const [appPend, setAppPend] = useState(0);
    const [successReq, setSuccessReq] = useState(false);
    const [billActive, setBillActive] = useState(false);
      const [billVisible, setBillVisible] = useState(false);
      const [arrow, setArrowActive] = useState(false);
    const [amount,setAmount] = useState(0);
  const [reqDetails, setReqDetails] = useState<ReqDetails>({
    custId: customerDetails.id,
    Name: "",
    Description: "",
  });

    const publicKey = "pk_test_4a431544da49620191857b0c73a96f0a38760af1";

    const logOut = () => {
      setCustomerDetails({
        id: 0,
        first_name: "",
        last_name: "",
        dob: "",
        email: "",
        phone_number: "",
        address: "",
        country: "",
        postalCode: "",
        state: "",
        city: "",
        wallet_amt: 0,
        wishlist: [''],
      });
       Cookies.remove("customerDetails");
     Cookies.remove("customerRole"); 

      navigate("/Home");
    }

    const getSuppliers = () =>{
console.log("Oh hello there"+role);

      fetch("https://pretiosusapi.gibsonline.com/api/Supplier/applications", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(`Failed to send details. ${error.message}`);
            });
          }
       return response.json();
        }).then((data) => {
          setSupplierApps(data);
          console.log("Data has been retrieved", data);
        })
        .catch((error) => {
          console.error("Error sending info:", error);
          setReqPend(false);
        });
}

const handleApprove = (id: number) =>{
  setAppPend(id)
      fetch("https://pretiosusapi.gibsonline.com/api/Supplier/applications/"+id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status:"approved"})
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
                  setAppPend(0)

              throw new Error(`Failed to send details. ${error.message}`);
            });
          }
       return response.json();
        }).then((data) => {
          console.log("Data has been sent", data);
              setAppPend(0);

        })
        .catch((error) => {
          console.error("Error sending info:", error);
            setAppPend(0)

        });
}

    const updateBillingInfo = () =>{ 
      console.log(JSON.stringify({
        ...updatedCustomerDetails,
        postal_code: updatedCustomerDetails.postalCode,
      }));
      
         setReqPend(true);
               fetch(
                 "https://pretiosusapi.gibsonline.com/api/Customers/" +
                   customerDetails.id,
                 {
                   method: "PATCH",
                   headers: {
                     "Content-Type": "application/json",
                   },
                   body: JSON.stringify(
                     {...updatedCustomerDetails, postal_code:updatedCustomerDetails.postalCode}
                   ),
                 }
               )
                 .then((response) => {
                   if (!response.ok) {
                     return response.json().then((error) => {
                       throw new Error(
                         `Failed to send details. ${error.message}`
                       );
                     });
                   }
                 })
                 .then((data) => {
                   Cookies.set(
                     "customerDetails",
                     JSON.stringify({
                       ...updatedCustomerDetails
                 }),
                     {
                       expires: 7,
                     }
                   );
                   setCustomerDetails(
                    updatedCustomerDetails
                   );
setReqPend(false);

                   console.log("Data has been sent", data);
                 })
                 .catch((error) => {
                   console.error("Error sending info:", error);
                   setReqPend(false);
                 });

    }

  const makePayment = (amount:number) => {
   setSuccessReq(false);
   setReqPend(true);
    const popup = new PaystackPop();

    popup.newTransaction({
      key: publicKey,
      email: customerDetails.email,
      amount:  amount * 100,
      onSuccess: (transaction: any) => {
        console.log(transaction);

         fetch(
           "https://pretiosusapi.gibsonline.com/api/Customers/" +
             customerDetails.id,
           {
             method: "PATCH",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({...customerDetails,
               wallet_amt: Number(customerDetails.wallet_amt+amount)
             }),
           }
         )
           .then((response) => {
             if (!response.ok) {
               return response.json().then((error) => {
                 throw new Error(`Failed to send details. ${error.message}`);
               });
             }
           })
           .then((data) => {
             Cookies.set("customerDetails", JSON.stringify({...customerDetails, wallet_amt:customerDetails.wallet_amt+amount}), {
               expires: 7,
             }); 
 setCustomerDetails({
   ...customerDetails,
   wallet_amt: customerDetails.wallet_amt + amount,
 }); 
                     setAmount(0);
                     setSuccessReq(true);

             console.log("Data has been sent", data);
           })
           .catch((error) => {
             console.error("Error sending info:", error);
           });
setReqPend(false);
},
      onLoad: (response: any) => {
        console.log("onLoad: ", response);
      },
      onCancel: () => {
        console.log("onCancel");
      },
      onError: (error: { message: any }) => {
        console.log("Error: ", error.message);
      },
})}

    const handleRequest = (Name:string,Description:string) => {
                setSuccessReq(false);
    console.log("Submitting Request:", JSON.stringify({Name:Name,Description:Description})); // Check that all required fields are filled
    if (Name) {
            setReqPend(true);
      fetch("https://pretiosusapi.gibsonline.com/api/Request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          custId: reqDetails.custId,
          productName: reqDetails.Name,
          description: reqDetails.Description,
        })
      })
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to send details. ${error.message}`);
          }
        })
        .then((data) => {
          console.log("Request Sent", data);
          setSuccessReq(true);
          setReqPend(false);

        });}
      }
  return (
    <>
      <Nav data={[customerDetails, Products]} />
      <div className="profileInfo-container">
        {!customerDetails.email && (
          <div className="mobile-section-container">
            <div className="Loader" id="Loader">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        {customerDetails.email && (
          <>
            {billActive && (
              <div
                className={
                  !billVisible ? "Billing-info" : "Billing-info active"
                }
              >
                <h2>
                  <span>
                    <img
                      className="cancel-sign"
                      src="\src\assets\close_24dp__FILL0_wght400_GRAD0_opsz24.png"
                      onClick={() => {
                        setBillActive(false);
                      }}
                      alt=""
                    />
                  </span>
                  &nbsp; Billing details &nbsp;
                  <img
                    src="src/assets/Icon Arrow.png"
                    alt="arrow"
                    className={!arrow ? "Arrow" : "Arrow active"}
                    onClick={() => {
                      setBillVisible(!billVisible);
                      setArrowActive(!arrow);
                    }}
                  />
                </h2>
                <div className="name-info">
                  <div>
                    <h4>First Name</h4>
                    <input
                      type="text"
                      value={updatedCustomerDetails.first_name}
                      onChange={(e) =>
                        setUpdatedCustomerDetails({
                          ...updatedCustomerDetails,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <h4>Last Name</h4>
                    <input
                      type="text"
                      value={updatedCustomerDetails.last_name}
                      onChange={(e) =>
                        setUpdatedCustomerDetails({
                          ...updatedCustomerDetails,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="billing-data">
                  <h4>Country / Region</h4>
                  <input
                    type="text"
                    value={updatedCustomerDetails.country}
                    onChange={(e) =>
                      setUpdatedCustomerDetails({
                        ...updatedCustomerDetails,
                        country: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="billing-data">
                  <h4>Street Address</h4>
                  <input
                    type="text"
                    value={updatedCustomerDetails.address}
                    onChange={(e) =>
                      setUpdatedCustomerDetails({
                        ...updatedCustomerDetails,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="billing-data">
                  <h4>Town / City</h4>
                  <input
                    type="text"
                    value={updatedCustomerDetails.city}
                    onChange={(e) =>
                      setUpdatedCustomerDetails({
                        ...updatedCustomerDetails,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="billing-data">
                  <h4>State</h4>
                  <input
                    type="text"
                    value={updatedCustomerDetails.state}
                    onChange={(e) =>
                      setUpdatedCustomerDetails({
                        ...updatedCustomerDetails,
                        state: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="billing-data">
                  <h4>Zip code</h4>
                  <input
                    type="text"
                    value={updatedCustomerDetails.postalCode}
                    onChange={(e) =>
                      setUpdatedCustomerDetails({
                        ...updatedCustomerDetails,
                        postalCode: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="billing-data">
                  <h4>Phone</h4>
                  <input
                    type="text"
                    value={updatedCustomerDetails.phone_number}
                    onChange={(e) =>
                      setUpdatedCustomerDetails({
                        ...updatedCustomerDetails,
                        phone_number: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="billing-data">
                  <h4>Email address</h4>
                  <input
                    type="text"
                    value={updatedCustomerDetails.email}
                    onChange={(e) =>
                      setUpdatedCustomerDetails({
                        ...updatedCustomerDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="billing-data">
                  <h4></h4>
                  <input type="text" placeholder="Additional information" />
                </div>

                <span className="billBtn" onClick={updateBillingInfo}>
                  <span></span>Update Info{" "}
                  {reqPend && <div className="loader"></div>}
                </span>
              </div>
            )}

            <div
              className="profileInfo"
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              <button onClick={logOut} className="logOutbtn">
                Log Out
              </button>
              <div className="profileimg">
                <span>
                  <img src="/src/assets/default_pfp.png" alt="" />
                </span>
                <h2>
                  Hello, {customerDetails.first_name}
                  <br />
                  {role === "admin" && <>{`{Admin}`}</>}
                </h2>
              </div>
              <div className="cash-cove">
                <p>
                  <img src="\src\assets\wallet_24dp_261870_FILL0_wght400_GRAD0_opsz24.png" />
                  Preak Mart store Cash Cove balance:{" "}
                  <b>&#8358;{formatter.format(customerDetails.wallet_amt)}</b>
                </p>
                <Link to={"/wishlist"}>
                  <span>Your Wishlist</span>
                </Link>
              </div>
              {role == "admin" && (
                <span
                  onClick={() => {
                    getSuppliers();
                    setVenReqActive(!venReqActive);
                  }}
                >
                  Vendor Requests
                </span>
              )}
              <span
                onClick={() => {
                  setBillActive(true);
                }}
              >
                Address Book
              </span>
              <Link to={"/Orders"}>
                <span>Your Orders</span>
              </Link>
              {role != "seller" && <Link to={"/Membership"}>
                <span>Become a vendor</span>
              </Link>}
              <Link to={"/ProductUpload"}>
                <span>Add a Product</span>
              </Link>
              <div className="askMoney">
                <span
                  onClick={() => {
                    setaskForActive(!askForActive);
                  }}
                >
                  Ask for a Product
                </span>
                <span
                  onClick={() => {
                    setAddWalletActive(true);
                  }}
                >
                  My Cash Cove Wallet
                </span>
              </div>
            </div>
            {venReqActive && (
              <>
                <div
                  className="blur"
                  onClick={() => {
                    setVenReqActive(!venReqActive);
                  }}
                ></div>
                <div className="supplierReq-container">
                  {supplierApps == "" && (
                    <div className="loading-screen">
                      <div className="loader"></div>
                    </div>
                  )}
                  {supplierApps != "" &&
                    supplierApps.map((app: any) => (
                      <>
                        <table className="tables">
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>User Id</th>
                              <th>Name</th>
                              <th>Contacts</th>
                              <th>Email</th>
                              <th>Status</th>
                              <th>Business Details</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr key={app.id}>
                              <td>{app.id}</td>
                              <td>{app.userId}</td>
                              <td>{app.supplierName}</td>
                              <td>
                                {app.supplierPrimaryContact} ,{" "}
                                {app.supplierSecondaryContact}
                              </td>
                              <td>{app.supplierEmail}</td>
                              <td>{app.status}</td>
                              <td>
                                <p
                                  onClick={() => {
                                    setReqDetActive(app.id);
                                  }}
                                >
                                  {app.businessDetails}
                                </p>
                              </td>
                              <td>
                                {app.status != "Approved" ? (
                                  appPend != app.id ? (
                                    <button
                                      onClick={() => {
                                        handleApprove(app.id);
                                      }}
                                      className="approve-btn"
                                    >
                                      Approve{" "}
                                      <img src="\src\assets\check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"></img>
                                    </button>
                                  ) : (
                                    <div className="loading-screen">
                                      <div className="loader"></div>
                                    </div>
                                  )
                                ) : (
                                  <span style={{ color: "green" }}>
                                    Approved
                                  </span>
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {reqDetActive !== 0 && (
                          <>
                            <div
                              className="blur"
                              onClick={() => {
                                setReqDetActive(0);
                              }}
                            ></div>
                            {reqDetActive === app.id && (
                              <div className="business-info">
                                <b
                                  onClick={() => {
                                    setReqDetActive(0);
                                  }}
                                >
                                  X
                                </b>
                                <span>
                                  <b>Name:</b> {app.supplierName}
                                </span>
                                <span>
                                  <b>Email:</b> {app.supplierEmail}
                                </span>
                                <span>
                                  <b>No:</b> {app.supplierPrimaryContact} ,{" "}
                                  {app.supplierSecondaryContact}
                                </span>
                                <h2>Business Description</h2>
                                <p>{app.businessDetails}</p>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    ))}
                </div>
              </>
            )}
            {addWalletActive && (
              <>
                <div
                  className="blur"
                  onClick={() => {
                    setAddWalletActive(false);
                    setSuccessReq(false);
                    setReqPend(false);
                  }}
                ></div>
                <div className="moneyBox-container">
                  <div className="moneyimg">
                    <span>
                      <img src="\src\assets\wallet_24dp_261870_FILL0_wght400_GRAD0_opsz24.png" />
                    </span>
                    <p>Wallet Balance:</p>
                    <h2>
                      &#8358;{formatter.format(customerDetails.wallet_amt)}
                    </h2>
                    {reqPend && (
                      <div className="loading-screen">
                        <div className="loader"></div>
                      </div>
                    )}
                  </div>
                  {successReq && (
                    <p className="Request-alert">
                      &nbsp;Cash Cove Funded{" "}
                      <img src="\src\assets\greenCheck.png" alt="" />
                    </p>
                  )}
                  {addToWallet ? (
                    <form action="">
                      <div className="addWallet">
                        <input
                          type="number"
                          placeholder="Enter in amount"
                          onChange={(e) => setAmount(Number(e.target.value))}
                        />
                        <div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              makePayment(amount);
                            }}
                          >
                            Make Transfer
                          </button>
                          <img
                            src="\src\assets\close_24dp__FILL0_wght400_GRAD0_opsz24.png"
                            onClick={() => {
                              setAddToWallet(false);
                            }}
                            alt=""
                          />
                        </div>
                      </div>
                    </form>
                  ) : (
                    <span
                      onClick={() => {
                        setAddToWallet(true);
                      }}
                    >
                      Add to Wallet <b>+</b>
                    </span>
                  )}
                </div>
              </>
            )}
            {askForActive && (
              <>
                <div
                  className="blur"
                  onClick={() => {
                    setaskForActive(!askForActive);
                    setSuccessReq(false);
                    setReqPend(false);
                  }}
                ></div>
                <form action="">
                  <div className="askFor-container">
                    <h1>Request For a Product You Couldn't Find</h1>
                    {reqPend && (
                      <div className="loading-screen">
                        <div className="loader"></div>
                      </div>
                    )}
                    <div
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="100"
                    >
                      <span>Product Name</span>
                      <input
                        type="text"
                        placeholder="Enter the name of this product"
                        onChange={(e) =>
                          setReqDetails({ ...reqDetails, Name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="200"
                    >
                      <span>Product Description</span>
                      <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={8}
                        placeholder="Tell us more about this product"
                        onChange={(e) =>
                          setReqDetails({
                            ...reqDetails,
                            Description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    {successReq && (
                      <span className="Request-alert">
                        &nbsp;Product Request Sent{" "}
                        <img src="\src\assets\greenCheck.png" alt="" />
                      </span>
                    )}
                    <button
                      className="contact-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRequest(reqDetails.Name, reqDetails.Description);
                      }}
                    >
                      Send Request
                      <img src="\src\assets\Arrow.png" alt="" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        )}
      </div>
      <Footer data={[customerDetails]} />
    </>
  );
};

export default Profile;
