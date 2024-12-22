import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

type Details = {
  email: string;
  password: string;
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

interface loginProps {
  data: [
    setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>,
    setRole: React.Dispatch<React.SetStateAction<string>>,
    setInCheckout: React.Dispatch<React.SetStateAction<boolean>>,
    inCheckout: boolean
  ];
}

const Login = (props: loginProps) => {
  const { data } = props;
  const [setCustomerDetails,setRole, setInCheckout,inCheckout] = data;
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const [logPend, setLogPend] = useState(false);
  const [passVisible, setPassVisible] = useState(false);
  const [Details, setDetails] = useState<Details>({
    email: "",
    password: "",
  });

/*     useEffect(() => {
       setTimeout(() => {
        const cookies = Cookies.get("customerDetails");
        if (cookies) {
        const savedCustomerDetails = JSON.parse(cookies);
        console.log("This is saved"+JSON.stringify(savedCustomerDetails));
        setLogPend(true);
        handleLogin(savedCustomerDetails.email, savedCustomerDetails.password);            
        if (
            savedCustomerDetails
        ) {
            console.log("effect");
            setDetails({
            email:savedCustomerDetails.email,
            password: savedCustomerDetails.password,
            });
            setLogPend(false);
        }
        }
      }, 2000)
    }, []);
 */
  const handleLogin = (email:string,password:string) => {
    console.log("Submitting details:", JSON.stringify({email:email,password:password})); // Check that all required fields are filled
    if (email && password) {
       setLogPend(true);
      fetch(
        "https://pretiosusapi.gibsonline.com/api/Login?email=" +
          email +
          "&password=" +
          password,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (response) => {
          if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to send details. ${error.message}`);
          }
          return response.json();
        })
        .then((data) => {   
          fetch(
            "https://pretiosusapi.gibsonline.com/api/Customers/" +
              data.detail[0].id,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (response) => {
            if (!response.ok) {
              const error = await response.json();
              throw new Error(`Failed to send details. ${error.message}`);
            }
            return response.json();
          })
          .then((data2) => {
          console.log("Customer info retrieved", data2, data.detail[0].role);
          setCustomerDetails({...data2});     
          setRole(data.detail[0].role); 
                 setLogPend(false);
      Cookies.set(
            "customerDetails",
            JSON.stringify(data2),
            { expires: 7 }
          ); 
                     Cookies.set(
                       "customerRole",
                       JSON.stringify(data.detail[0].role),
                       {
                         expires: 7,
                       }
                     ); 


          if(inCheckout){
          setInCheckout(false);
          navigate("/Checkout");
          }
          else
          navigate("/Home");
        })
      })
        .catch((error) => {
                 setLogPend(false);
          console.error("Error sending info:", error);
        });
    } else {
      console.log("Please fill out all required fields.");
    }
  };

  return (
    <>
      <div className="content">
        <h1 className="text4">Login</h1>
        {logPend && (
          <div className="loading-screen">
            <div className="loader"></div>
          </div>
        )}
        <div className="formContainer">
          <form method="post">
            <div className="form-group">
              <input
                onFocus={() => setTouched({ ...touched, email: true })}
                onChange={(e) =>
                  setDetails({ ...Details, email: e.target.value })
                }
                type="email"
                id="formInput"
                name="email"
                value={Details.email}
                placeholder="Email"
                required
              />
              <img src="" alt="" />
            </div>
            {touched.email && !Details.email && (
              <span>Field must be field in</span>
            )}

            <div className="form-group">
              <input
                onFocus={() => setTouched({ ...touched, password: true })}
                onChange={(e) =>
                  setDetails({ ...Details, password: e.target.value })
                }
                type={passVisible ? "text" : "password"}
                id="formInput"
                name="password"
                value={Details.password}
                placeholder="Password"
                required
              />
              &nbsp;{" "}
              {passVisible ? (
                <img
                  src="\src\assets\visibility_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
                  className="visibilityIcon"
                  alt=""
                  onClick={() => {
                    setPassVisible(false);
                  }}
                />
              ) : (
                <img
                  src="\src\assets\visibility_off_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
                  alt=""
                  className="visibilityIcon"
                  onClick={() => {
                    setPassVisible(true);
                  }}
                />
              )}
            </div>
            {touched.password && !Details.password && (
              <span>Field must be field in</span>
            )}

            <Link className="Text3" to={"/Recovery"}>
              <p>Forgot your password?</p>
            </Link>

            <h2 className="Text2">
              I don't have an account
              <Link to={"/Account"}>
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
                  handleLogin(Details.email, Details.password);
                  e.preventDefault();
                }}
              >
                <h2 className="text3">Login</h2>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
5;
