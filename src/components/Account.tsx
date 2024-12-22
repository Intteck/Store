import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Account.css"
import Footer from "./Footer";

interface Props {
  data: [
    customerDetails: CustomerDetails,
  ]}


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
    postalCode: string;
    city: string;
    wallet_amt: number;
    wishlist: string[];
  };

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
  wallet_amt: number;
  wishlist: number[];
};

const Account =(props:Props)=>{
          const { data } = props;
            const [touched, setTouched] = useState(false);
            const [customerDetails] = data;
              const [passVisible, setPassVisible] = useState(false);
        const navigate = useNavigate();
 const [Details, setDetails] = useState<Details>({
   firstName: " ",
   lastName: " ",
   phone: " ",
   address: " ",
   postalCode: " ",
   country: " ",
   state: " ",
   city: " ",
   dob: new Date().toISOString(), // Example date format
   email: " ",
   password: " ",
   wallet_amt: 0,
   wishlist: [0],
 });

const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;


const Register = () => {
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
    Details.password &&
    Details.password.length > 7 
  &&
    regex.test(Details.password)
 )
  {
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
      })
      .then((data) => {
        console.log("Data has been sent", data);
                navigate("/Login");

      })
      .catch((error) => {
        console.error("Error sending info:", error);
      });
  } else {
    setTouched(true)
    console.log(regex.test(Details.password));
    
    console.log("Please fill out all required fields.");
  }
};    return (
  <>
    <div className="content">
      <h1 className="text1">
        Create<br></br> Account
      </h1>
      <div className="formContainer">
        <form method="post">
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
              onChange={(e) => setDetails({ ...Details, city: e.target.value })}
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
                setDetails({
                  ...Details,
                  dob: new Date(e.target.value).toISOString(),
                })
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
              type={passVisible ? "text" : "password"}
              id="formInput"
              name="password"
              placeholder="Password"
              required
            />
            &nbsp; {passVisible? <img src="\src\assets\visibility_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" className="visibilityIcon" alt="" onClick={()=>{setPassVisible(false)}} /> : <img src="\src\assets\visibility_off_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" alt="" className="visibilityIcon" onClick={()=>{setPassVisible(true)}} />}
          </div>
          {!Details.password && (
            <span>
              Field must be field in<br></br>
            </span>
          )}
          {touched && Details.password.length < 8 && (
            <span>
              Password must have more than 7 characters<br></br>
            </span>
          )}
          {touched && regex.test(Details.password) !== true && (
            <span>Password must contain letters and numbers</span>
          )}
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
                Register();
                e.preventDefault();
              }}
            >
              <h2 className="text3"> Done</h2>
            </button>
          </div>
        </form>
      </div>
      
    </div>
    <Footer data={[customerDetails]} />
  </>
);
};

export default Account;
