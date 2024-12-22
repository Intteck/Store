import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
interface navProps {
  data: [
    customerDetails: CustomerDetails,
     Products: ProductItem[] | null,

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
  postalCode: string;
  city: string;
  wallet_amt: number;
  wishlist: string[];
};


const Nav = (props:navProps) => {
        const { data } = props;
        const [customerDetails,Products] = data;
          const [page, setPage] = useState(1);
            const [section, setSection] = useState(1);
const [searchItem,setSearchItem] = useState("");
const [searchActive,setSearchActive] = useState(false);
  const formatter = new Intl.NumberFormat("en-US");
  const [cartNo, setCartNo] = useState();
  var filteredProducts: ProductItem[];

  if(Products){
    filteredProducts = Products.filter((item) =>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    );
  }
  useEffect(() => {
      if (customerDetails.id === 0) {
        if(Cookies.get("cartItems") !== undefined){
        const savedCartItems = JSON.parse(Cookies.get("cartItems")!);
               setCartNo(savedCartItems.length);
               console.log();
               
        }
      } 
      
      else {
        if(Cookies.get("cartItems") !== undefined && Cookies.get("cartItems" + customerDetails.id) !== undefined){
         const customerCartItems = JSON.parse(Cookies.get("cartItems" + customerDetails.id)!);
        const generalCartItems = JSON.parse(Cookies.get("cartItems")!);
        const savedCartItems = customerCartItems.concat(generalCartItems);
               setCartNo(savedCartItems.length);     

               Cookies.set("cartItems"+customerDetails.id, JSON.stringify(savedCartItems), {
                 expires: 30,
               });
           Cookies.remove("cartItems");
        }
  
        else if(Cookies.get("cartItems") !== undefined){
        const customerCartItems = JSON.parse(Cookies.get("cartItems")!);
       setCartNo(customerCartItems.length);      
        }

         else if (Cookies.get("cartItems" + customerDetails.id) !== undefined) {
           const customerCartItems = JSON.parse(
             Cookies.get("cartItems" + customerDetails.id)!
           );
           setCartNo(customerCartItems.length);
         }

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
              <img src="\src\assets\Preak Mart.jpg" alt="" />
            </Link>
            <div>
              <input
                type="text"
                name=""
                id="searchInput"
                placeholder="Search"
                onChange={(e) => {
                  setSearchItem(e.target.value);
                }}
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
              <img src="\src\assets\Preak Mart.jpg" alt="" />
            </Link>
            <div className="nav-links">
              <Link to={"/Home"}>Home</Link>
              <Link to={"/Product"}>Shop</Link>
              <Link to={"/About"}>About</Link>
              <Link to={"/Contact"}>Contact</Link>
            </div>
            <div className="icon-search-container">
              <div className="nav-icons">
                {customerDetails.email ? (
                  <Link to={"/profile"}>
                    <img src="\src\assets\mdi_account-outline.png" alt="" />
                    Hi, {customerDetails.first_name}
                  </Link>
                ) : (
                  <Link to={"/Account"}>
                    <img
                      src="\src\assets\mdi_account-alert-outline.png"
                      alt=""
                    />
                  </Link>
                )}
                <img
                  src="\src\assets\akar_icons_search.png"
                  className="search-icon"
                  alt=""
                  onClick={() => {
                    setSearchActive(!searchActive);
                  }}
                />
                <Link className="cart-icon" to={"/Cart"}>
                  <img
                    src="\src\assets\ant_design_shopping_cart_outlined.png"
                    alt=""
                  />
                  {cartNo != 0 ? (
                    <span className="cart-counter">{cartNo}</span>
                  ) : (
                    ""
                  )}
                </Link>
                <span className="wallet-icon">
                  {" "}
                  <img src="\src\assets\wallet_24dp_261870_FILL0_wght400_GRAD0_opsz24.png" />
               <b>&nbsp;: &#8358;{formatter.format(customerDetails.wallet_amt)}</b>
                </span>
              </div>
              <div
                className={
                  searchActive == false ? "Search-pc " : "Search-pc active"
                }
              >
                <input
                  type="text"
                  name=""
                  id="searchInput"
                  placeholder="Search"
                  onChange={(e) => {
                    setSearchItem(e.target.value);
                  }}
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
          </div>
          {searchItem && (
            <div className="search-page">
              <div className="content">
                <div className="mobile-section-container">
                  {!Products && (
                    <div className="Loader" id="Loader">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  )}
                  {filteredProducts! &&
                    filteredProducts
                      .slice(0 + 20 * (page - 1), 20 * page)
                      .map((item, index) => (
                        <Link
                          key={index}
                          className="mobile-product-card"
                          to={`/Product/${item.id}`}
                        >
                          <div className="image-holder">
                            <img
                              src={
                                "https://pretiosusadmin.gibsonline.com/Product_Images/" +
                                item.image_URL
                              }
                              alt={item.name}
                            />
                          </div>
                          <div className="product-details">
                            <h4>
                              {item.name}
                            </h4>
                            <span>
                              {item.description}
                            </span>
                            <b>&#8358;{formatter.format(Number(item.price))}</b>
                          </div>
                        </Link>
                      ))}
                </div>
                {filteredProducts! && (
                  <div className="product-pagination">
                    <button
                      style={{ display: section === 1 ? "none" : "inline" }}
                      onClick={() => {
                        setTimeout(() => {
                          setPage(section - 1);
                          setSection(section - 1);
                          window.scrollTo(0, 0);
                        }, 500);
                      }}
                    >
                      Previous
                    </button>
                    <button
                      className={page === section ? "active" : ""}
                      onClick={() => {
                        setTimeout(() => {
                          setPage(section);
                          window.scrollTo(0, 0);
                        }, 500);
                      }}
                    >
                      {section}
                    </button>
                    <button
                      className={page === section + 1 ? "active" : ""}
                      style={{
                        display:
                          section + 1 > Math.ceil(filteredProducts.length / 20)
                            ? "none"
                            : "inline",
                      }}
                      onClick={() => {
                        setTimeout(() => {
                          setPage(section + 1);
                          window.scrollTo(0, 0);
                        }, 500);
                      }}
                    >
                      {section + 1}
                    </button>
                    <button
                      className={page === section + 2 ? "active" : ""}
                      style={{
                        display:
                          section + 2 > Math.ceil(filteredProducts.length / 20)
                            ? "none"
                            : "inline",
                      }}
                      onClick={() => {
                        setTimeout(() => {
                          setPage(section + 2);
                          window.scrollTo(0, 0);
                        }, 500);
                      }}
                    >
                      {section + 2}
                    </button>
                    <button
                      style={{
                        display:
                          section >= Math.floor(filteredProducts.length / 20)
                            ? "none"
                            : "inline",
                      }}
                      onClick={() => {
                        setTimeout(() => {
                          setPage(section + 1);
                          setSection(section + 1);
                          window.scrollTo(0, 0);
                          console.log(filteredProducts.length / 20);
                        }, 500);
                      }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
              <Footer data={[customerDetails]} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Nav;
