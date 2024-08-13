import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      {!(
        location.pathname === "/"
      ) && (
        <div>
          <footer className="mobile-nav mobile">
            <Link
              to={"/Home"}
              className={`mobile-nav-icon ${
                location.pathname === "/Home" ? "active" : ""
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect opacity="0.01" width="24" height="24" fill="white" />
                <g clip-path="url(#clip0_18_977)">
                  <g clip-path="url(#clip1_18_977)">
                    <path
                      d="M2.20898 20.7021V9.23066L12.0581 2.30356L21.9072 9.23066V20.7021C21.9072 21.2616 21.3726 21.8822 20.4963 21.8822H3.6199C2.74362 21.8822 2.20898 21.2616 2.20898 20.7021Z"
                      stroke="#261870"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.85693 20.925V10.917H15.2587V20.925"
                      stroke="#261870"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_18_977">
                    <rect
                      width="21.6982"
                      height="21.8012"
                      fill="white"
                      transform="translate(1.20898 1.08099)"
                    />
                  </clipPath>
                  <clipPath id="clip1_18_977">
                    <rect
                      width="21.6982"
                      height="21.8012"
                      fill="white"
                      transform="translate(1.20898 1.08099)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link
              to={"/Search"}
              className={`mobile-nav-icon ${
                location.pathname === "/Search" ? "active" : ""
              }`}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 19L15.6569 14.6569M15.6569 14.6569C17.1046 13.2091 18 11.2091 18 9C18 4.58172 14.4183 1 10 1C5.58172 1 2 4.58172 2 9C2 13.4183 5.58172 17 10 17C12.2091 17 14.2091 16.1046 15.6569 14.6569Z"
                  stroke="#261870"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20 20L15.6569 15.6569M15.6569 15.6569C17.1046 14.2091 18 12.2091 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C12.2091 18 14.2091 17.1046 15.6569 15.6569Z"
                  stroke="#261870"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
            <Link to={"/Cart"}  className={`mobile-nav-icon ${
                location.pathname === "/Cart" ? "active" : ""
              }`}>
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_18_964)">
                  <g clip-path="url(#clip1_18_964)">
                    <path
                      d="M1.97595 19.7999V4.76396L5.13424 1H18.9695L22.1278 4.76395V19.7999C22.1278 20.3601 21.5821 20.9999 20.6665 20.9999H3.43727C2.5217 20.9999 1.97595 20.3601 1.97595 19.7999Z"
                      stroke="#261870"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M2.57092 4.39999H21.6365"
                      stroke="#261870"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.3664 8.79999C16.3664 11.23 14.4346 13.2 12.0517 13.2C9.66871 13.2 7.73694 11.23 7.73694 8.79999"
                      stroke="#261870"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_18_964">
                    <rect
                      width="22.1519"
                      height="21.9999"
                      fill="white"
                      transform="translate(0.975952)"
                    />
                  </clipPath>
                  <clipPath id="clip1_18_964">
                    <rect
                      width="22.1519"
                      height="21.9999"
                      fill="white"
                      transform="translate(0.975952)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link to={"/Account"}  className={`mobile-nav-icon ${
                location.pathname === "/Profile" || location.pathname === "/Account" ? "active" : ""
              }`}>
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_18_972)">
                  <g clip-path="url(#clip1_18_972)">
                    <path
                      d="M4.52002 0.999996C2.58495 0.999996 1 2.57594 1 4.49999V17.5C1 19.4241 2.58495 21 4.52002 21H19.48C21.4151 21 23 19.4241 23 17.5V4.49999C23 2.57594 21.4151 0.999996 19.48 0.999996H4.52002Z"
                      stroke="#261870"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1 7.19995H23"
                      stroke="#261870"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_18_972">
                    <rect width="24" height="22" fill="white" />
                  </clipPath>
                  <clipPath id="clip1_18_972">
                    <rect width="24" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
          </footer>
          <footer className="pc pc-footer-container">
            <hr />
            <div className="pc-footer">
              <div className="footer-info">
                  <Link to={"/Home"}><img src="\src\assets\Pretiosus 1.png" alt="" /></Link>
                <span>
                  Block A2 Suite 12FF Aregbeshola shopping mall<br/>
Pako Bus stop, Alimosho-Ipaja Road, Lagos
                </span>
              </div>
              <div className="footer-links">
                <h5>Links</h5>
                <span>Home</span>
                <span>Shop</span>
                <span>About</span>
                <span>Contact</span>
              </div>
              <div className="footer-links">
                <h5>Help</h5>
                <span>Payment Options</span>
                <span>Returns</span>
                <span>Privacy Policies</span>
              </div>
              <div className="footer-links">
                <h5>Newsletter</h5>
                <div>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter Your Email Address"
                  />
                  <button>SUBSCRIBE</button>
                </div>
              </div>
            </div>
            <hr />
          </footer>
        </div>
      )}
    </>
  );
};

export default Footer;
