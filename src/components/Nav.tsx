import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Nav = () => {
  const [cartNo, setCartNo] = useState();
  
  useEffect(() => {
    const savedCartItems = Cookies.get("cartItems");
    if (savedCartItems) {
      setCartNo((JSON.parse(savedCartItems)).length);
    }
  });
  return (
    <>
      {!(location.pathname === "/") && (
        <>
          <div
            className="searchBar mobile"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <Link to={"/Home"}>
              <img src="\src\assets\Pretiosus 1.png" alt="" />
            </Link>
            <div>
              <input
                type="text"
                name=""
                id="searchInput"
                placeholder="Search"
              />
              <img
                src="\src\assets\Filter Icon.svg"
                alt=""
                style={{
                  display: location.pathname !== "/Home" ? "block" : "none",
                }}
              />
            </div>
          </div>
          <div
            className="pcview-nav pc"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <Link to={"/Home"}>
              <img src="\src\assets\Pretiosus 1.png" alt="" />
            </Link>
            <div className="nav-links">
              <Link to={"/Home"}>Home</Link>
              <Link to={"/Product"}>Shop</Link>
              <li>About</li>
              <li>Contact</li>
            </div>
            <div className="nav-icons">
              <Link to={"/Account"}>
                <img src="\src\assets\mdi_account-alert-outline.png" alt="" />
              </Link>
              <Link to={"/Search"}>
                <img src="\src\assets\akar_icons_search.png" alt="" />
              </Link>
              <Link className="cart-icon" to={"/Cart"}>
                <img
                  src="\src\assets\ant_design_shopping_cart_outlined.png"
                  alt=""
                />
                {cartNo != 0 ? (<span className="cart-counter">{cartNo}</span>):""}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Nav;
