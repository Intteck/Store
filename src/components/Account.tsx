import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Account.css"
import Footer from "./Footer";

type Details = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  postalCode: string;
  country: string;
  state: string;
  city: string;
  dob: string; 
  email: string;
  password: string;
};

const Account =()=>{
 const [Details, setDetails] = useState<Details>({
   firstName: " ",
   lastName: " ",
   phone: " ",
   address: " ",
   postalCode: " ",
   country: " ",
   state: " ",
   city: " ",
   dob:new Date().toISOString(), // Example date format
   email: " ",
   password: " ",
 });



const Register = (e: React.FormEvent) => {
  e.preventDefault();
console.log("Submitting details:", JSON.stringify(Details));  // Check that all required fields are filled
  if (
    Details.firstName &&
    Details.lastName &&
    Details.phone &&
    Details.address &&
    Details.postalCode &&
    Details.country &&
    Details.state &&
    Details.city &&
    Details.dob &&
    Details.email &&
    Details.password
  ) {
    fetch("https://pretiosusapi.gibsonline.com/api/Customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Details),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(`Failed to send details. ${error.message}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data has been sent", data);
      })
      .catch((error) => {
        console.error("Error sending info:", error);
      });
  } else {
    console.log("Please fill out all required fields.");
  }
};    return (
      <>
        <div className="content">
          <h1 className="text1">
            Create<br></br> Account
          </h1>
          <div className="formContainer">
            <form action="/submit-form" method="post">
              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, firstName: e.target.value })
                  }
                  type="text"
                  id="formInput"
                  name="firstName"
                  placeholder="First Name"
                  required
                />
              </div>
              {!Details.firstName && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, lastName: e.target.value })
                  }
                  type="text"
                  id="formInput"
                  name="lastName"
                  placeholder="Last Name"
                  required
                />
              </div>
              {!Details.lastName && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, phone: e.target.value })
                  }
                  type="text"
                  id="formInput"
                  name="phone"
                  placeholder="Phone Number"
                  required
                />
              </div>
              {!Details.phone && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, address: e.target.value })
                  }
                  type="text"
                  id="formInput"
                  name="address"
                  placeholder="Address"
                  required
                />
              </div>
              {!Details.address && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, postalCode: e.target.value })
                  }
                  type="text"
                  id="formInput"
                  name="postalCode"
                  placeholder="Postal Code"
                  required
                />
              </div>
              {!Details.postalCode && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, country: e.target.value })
                  }
                  type="text"
                  id="formInput"
                  name="country"
                  placeholder="Country"
                  required
                />
              </div>
              {!Details.country && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, state: e.target.value })
                  }
                  type="text"
                  id="formInput"
                  name="state"
                  placeholder="State"
                  required
                />
              </div>
              {!Details.state && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, city: e.target.value })
                  }
                  type="text"
                  id="formInput"
                  name="city"
                  placeholder="City"
                  required
                />
              </div>
              {!Details.city && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, dob: new Date(e.target.value).toISOString() })
                  }
                  type="date"
                  id="formInput"
                  name="dob"
                  placeholder="Date of Birth"
                  required
                />
              </div>
              {!Details.dob && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, email: e.target.value })
                  }
                  type="email"
                  id="formInput"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              {!Details.email && <span>Field must be field in</span>}

              <div className="form-group">
                <input
                  onChange={(e) =>
                    setDetails({ ...Details, password: e.target.value })
                  }
                  type="password"
                  id="formInput"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              {!Details.password && <span>Field must be field in</span>}
              <h2 className="Text2">
                I already have an account
                <Link to={"/Login"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
                      fill="#261870"
                    />
                    <path
                      d="M16.6716 9.29501L15.492 10.4987L19.2476 14.1461H8.089V15.8313H19.2476L15.492 19.4786L16.6716 20.6823L22.5458 14.9887L16.6716 9.29501Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </h2>
              <div className="formBtn">
                <button
                  id="doneBtn"
                  type="submit"
                  onClick={(e) => {
                    Register(e);
                  }}
                >
                  <h2 className="text3"> Done</h2>
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </>
    );
};

export default Account;
5