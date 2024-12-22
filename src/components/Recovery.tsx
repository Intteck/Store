import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Recovery = () => {
  const [logPend, setLogPend] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [resend, setResend] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
                  const [passVisible, setPassVisible] = useState(false);
                                    const [cpassVisible, setCPassVisible] = useState(false);

                  const navigate = useNavigate();
    const [optSuc, setOptSec] = useState(false);
    const [optErr, setOtpErr] = useState(false);
    const [optCheck, setOtpCheck] = useState(false);
  const [touched, setTouched] = useState(false);

  const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;
const regex2 = /^\d*$/;

const changePassword = () => {
  setTouched(true);
            if (password && password === confirmPassword && regex.test(password)){
              setLogPend(true);
              fetch(
                "https://pretiosusapi.gibsonline.com/api/Customers/update/" +
                  email,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ password: password }),
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
                  setLogPend(false);
                  console.log("Data has been sent", data);
                  navigate("/login");
                })
                .catch((error) => {
                  setLogPend(false);
                  console.error("Error sending info:", error);
                });
            }
}

  const handleOtp = () =>{
                  setOtpErr(false);
                  setTouched(true);
      if (code) {
                setLogPend(true);
        fetch(
          "https://pretiosusapi.gibsonline.com/api/ForgotPassword/verify-reset-code",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, code : code }),
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
            console.log("Data has been sent", data);
            setLogPend(false);
            setTouched(false);
            setOptSec(true);
          })
          .catch((error) => {
            console.error("Error sending info:", error);
            setLogPend(false);
            setOtpErr(true);
          });
      }

  }

  const handleEmail = () =>{
             console.log(email);
             setTouched(true);
      if(email){
                     setLogPend(true);

   fetch(
     "https://pretiosusapi.gibsonline.com/api/ForgotPassword/forgot-password",
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ email: email }),
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
       console.log("Data has been sent", data);
                    setLogPend(false);
                    setTouched(false);
                    setOtpCheck(true);
                      setTimeout(() => {setResend(true)},10000)
                    
     })
     .catch((error) => {
       console.error("Error sending info:", error);
                    setLogPend(false);
     })
      }
  }

    return (
      <>
        <div className="recoveryPage">
          <img src="src\assets\Preak Mart.jpg" alt="" />
          {!optCheck && (
            <div className="formContainer">
              <form method="post">
                <h2>Enter in your Account's Email</h2>
                {logPend && (
                  <div className="loading-screen">
                    <div className="loader"></div>
                  </div>
                )}
                <div className="form-group">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="formInput"
                    name="email"
                    value={email}
                    placeholder="Email"
                    required
                  />
                  &nbsp;
                  <button
                    onClick={(e) => {
                      handleEmail();
                      e.preventDefault();
                    }}
                    style={{ display: "none" }}
                  ></button>
                  <Link
                    type="submit"
                    onClick={(e) => {
                      handleEmail();
                      e.preventDefault();
                    }}
                    to={""}
                  >
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
                </div>
                {touched && !email && <span>Field must be field in</span>}
              </form>
            </div>
          )}

          {optCheck && !optSuc && (
            <div className="formContainer">
              <form method="post">
                <h2>Enter in OTP</h2>
                <p>We sent a code to your Email</p>
                {logPend && (
                  <div className="loading-screen">
                    <div className="loader"></div>
                  </div>
                )}
                <div className="form-group">
                  <input
                    onChange={(e) => setCode(e.target.value)}
                    type="text"
                    id="formInput"
                    name="opt"
                    placeholder="Enter Otp"
                    pattern="\d*"
                    maxLength={6}
                    required
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleOtp();
                    }}
                    style={{ display: "none" }}
                  ></button>
                  &nbsp;
                  <Link
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOtp();
                    }}
                    to={""}
                  >
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
                </div>
                {touched && !code && (
                  <>
                    <span>Field must be field in</span>
                    <br></br>
                  </>
                )}
                {touched && !regex2.test(code) && (
                  <span>Code must be a number</span>
                )}
                {optErr && <span>Wrong code, please try again.</span>}

                {resend ? (
                  <p
                    className="Text3"
                    onClick={() => {
                      setOtpCheck(false);
                      setResend(false);
                    }}
                  >
                    Resend code?
                  </p>
                ) : (
                  <p className="Text3" style={{ color: "grey" }}>
                    Resend code?
                  </p>
                )}
              </form>
            </div>
          )}

          {optCheck && optSuc && (
            <div className="formContainer">
              <form method="post">
                <h2>Enter in your new Password</h2>
                {logPend && (
                  <div className="loading-screen">
                    <div className="loader"></div>
                  </div>
                )}
                <div className="form-group">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type={passVisible ? "text" : "password"}
                    id="formInput"
                    name="password"
                    value={password}
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
                {touched && !password && (
                  <span>
                    Field must be field in<br></br>
                  </span>
                )}
                {touched && password.length < 8 && (
                  <span>
                    Password must have more than 7 characters<br></br>
                  </span>
                )}
                {touched && regex.test(password) !== true && (
                  <span>Password must contain letters and numbers</span>
                )}
                <div className="form-group">
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type={cpassVisible ? "text" : "password"}
                    id="formInput"
                    name="password"
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    required
                  />
                  &nbsp;{" "}
                  {cpassVisible ? (
                    <img
                      src="\src\assets\visibility_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
                      className="visibilityIcon"
                      alt=""
                      onClick={() => {
                        setCPassVisible(false);
                      }}
                    />
                  ) : (
                    <img
                      src="\src\assets\visibility_off_24dp_000000_FILL0_wght400_GRAD0_opsz24.png"
                      alt=""
                      className="visibilityIcon"
                      onClick={() => {
                        setCPassVisible(true);
                      }}
                    />
                  )}
                </div>
                {touched && !confirmPassword && (
                  <span>
                    Field must be field in<br></br>
                  </span>
                )}
                {touched && password !== confirmPassword && (
                  <span>
                    Your password must Match<br></br>
                  </span>
                )}
                <div className="formBtn">
                  <button
                    id="doneBtn"
                    type="submit"
                    onClick={(e) => {
                      changePassword();
                      e.preventDefault();
                    }}
                  >
                    <h2 className="text3">
                      Confirm Password{" "}
                    </h2>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </>
    );
}
 
export default Recovery;