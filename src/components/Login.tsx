import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  state: string;
  city: string;
};

interface loginProps {
  data: [
    setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>
  ];
}

const Login = (props: loginProps) => {
  const { data } = props;
  const [setCustomerDetails] = data;
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const [logPend, setLogPend] = useState(false);
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
          console.log("Customer info retrieved", data);
          setCustomerDetails(data.detail[0]);
                 setLogPend(false);
      /*     Cookies.set(
            "customerDetails",
            JSON.stringify({ ...data.detail[0], password: password }),
            { expires: 7 }
          ); */
          navigate("/Home");
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
        {logPend && <div className="loading-screen">
          <div className="loader"></div>
        </div>}
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
            </div>
            {touched.email && !Details.email && <span>Field must be field in</span>}

            <div className="form-group">
              <input
                onFocus={() => setTouched({ ...touched, password: true })}
                onChange={(e) =>
                  setDetails({ ...Details, password: e.target.value })
                }
                type="password"
                id="formInput"
                name="password"
                value={Details.password}
                placeholder="Password"
                required
              />
            </div>
            {touched.password && !Details.password && <span>Field must be field in</span>}

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
