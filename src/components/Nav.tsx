import React from "react";
const Nav = () => {
  return (
    <>
      {!(
        location.pathname === "/" || location.pathname.startsWith("/Product")
      ) && (
        <>
          <div
            className="searchBar mobile"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <img src="\src\assets\Pretiosus 1.png" alt="" />
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
                  display: location.pathname !== "/Shop" ? "block" : "none",
                }}
              />
            </div>
          </div>
          <div
            className="pcview-nav pc"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <img src="\src\assets\Pretiosus 1.png" alt="" />
            <div className="nav-links">
              <li>Home</li>
              <li>Shop</li>
              <li>About</li>
              <li>Contact</li>
            </div>
            <div className="nav-icons">
              <img src="\src\assets\mdi_account-alert-outline.png" alt="" />
              <img src="\src\assets\akar-icons_search.png" alt="" />
              <img
                src="\src\assets\ant-design_shopping-cart-outlined.png"
                alt=""
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Nav;
