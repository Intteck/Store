import React from "react";
import { Link } from "react-router-dom";
import "./Account.css"
import Footer from "./Footer";

const Account =()=>{
 
    
    return (
      <>
        <div className="content">
          <h1 className="text1">
            Create<br></br> Account
          </h1>
          <div className="formContainer">
            <form action="/submit-form" method="post">
              <div className="form-group">
                <input
                  type="text"
                  id="formInput"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="formInput"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="formInputNumber"
                  name="phone"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <h2 className="Text2">
                I already have an account{" "}
                <Link to={"/Login"}><svg
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
                </svg></Link>
              </h2>
              <div className="formBtn">
                <button id="doneBtn" type="submit">
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