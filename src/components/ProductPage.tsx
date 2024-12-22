  import React, { useEffect, useState } from "react";
  import { Link, useNavigate, useParams } from "react-router-dom";
  import Footer from "./Footer";
  import Nav from "./Nav";
  import "./ProductPage.css";
  import Cookies from "js-cookie";

  interface productProps {
    data: [
      customerDetails: CustomerDetails,
      Products: ProductItem[] | null,
      isPending: boolean,
      cart: CartItem[],
      setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>,
      setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>
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

  type CartItem ={
    id: number;
    count: number;
  }

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
  postalCode: string;
  email: string;
  phone_number: string;
  address: string;
  country: string;
  state: string;
  city: string;
  wallet_amt: number;
  wishlist: string[];
};


  const ProductPage = (props: productProps) => {
      const [count,setCount] = useState(1);
    const { data } = props;
    const formatter = new Intl.NumberFormat("en-US");
  const [customerDetails, Products, isPending, cart, setCartItems, setCustomerDetails] = data;
  const [page,setPage] = useState(1);
  const [section,setSection] = useState(1);
  const [wishlist,setWishlist]  = useState(customerDetails.wishlist);

  const navigate = useNavigate();

  useEffect(() => {
    if (customerDetails.id === 0) {
      if (Cookies.get("cartItems") !== undefined) {
        const savedCartItems = JSON.parse(Cookies.get("cartItems")!);
        setCartItems(savedCartItems);
        console.log(savedCartItems);
      }
    } else {
      if (
        Cookies.get("cartItems") !== undefined &&
        Cookies.get("cartItems" + customerDetails.id) !== undefined
      ) {
        const customerCartItems = JSON.parse(
          Cookies.get("cartItems" + customerDetails.id)!
        );
        const generalCartItems = JSON.parse(Cookies.get("cartItems")!);
        const savedCartItems = customerCartItems.concat(generalCartItems);
        setCartItems(savedCartItems);
        Cookies.set(
          "cartItems" + customerDetails.id,
          JSON.stringify(savedCartItems),
          {
            expires: 30,
          }
        );
        Cookies.remove("cartItems");
      } else if (Cookies.get("cartItems") !== undefined) {
        const customerCartItems = JSON.parse(Cookies.get("cartItems")!);
        setCartItems(customerCartItems);
      } else if (Cookies.get("cartItems" + customerDetails.id) !== undefined) {
        const customerCartItems = JSON.parse(
          Cookies.get("cartItems" + customerDetails.id)!
        );
        setCartItems(customerCartItems);
      }
    }
  }, [Products]);





const addToWishlist = (cartIn: boolean) =>{
  let updatedBody =[''];
if (cartIn === true && !customerDetails.wishlist.includes(String(selectedItem.id))){ 
 updatedBody = [...customerDetails.wishlist, String(selectedItem.id)];
   setWishlist(updatedBody);
   console.log(cartIn);
   
} 
else
{
  updatedBody = customerDetails.wishlist.filter((wish)=>{
return wish !== String(selectedItem.id)
  })
  console.log("removed"+updatedBody);
     console.log(cartIn);

  
  setWishlist(updatedBody);
}
console.log("proccess sdtarted");
     fetch(
       "https://pretiosusapi.gibsonline.com/api/Customers/" +
         customerDetails.id,
       {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           ...customerDetails,
           wishlist: updatedBody,
         }),
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
         Cookies.set(
           "customerDetails",
           JSON.stringify({
             ...customerDetails,
             wishlist: updatedBody,
           }),
           {
             expires: 7,
           }
         );
         setCustomerDetails({
           ...customerDetails,
           wishlist: updatedBody,
         });
         console.log("Data has been sent", data);
       })
       .catch((error) => {
         console.error("Error sending info:", error);
       });
}

  const addToCart = () => {
    if(!cart.some((obj) => obj.id === selectedItem.id)){    
    const item = {id:selectedItem.id, count: count}
    const updatedCartItems = [...cart, item];
    setCartItems(updatedCartItems);
        addToWishlist(false);


    if(customerDetails.id !== 0){
    Cookies.set("cartItems"+customerDetails.id, JSON.stringify(updatedCartItems), { expires: 30 });
  }
    else{
     Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 30 });
    }
  }
}





  const { id } = useParams();
    console.log(id);
    if (id === undefined)
    return (
      <>
        <Nav data={[customerDetails, Products]} />
        <div className="content">
          <div className="mobile-section-container">
            {isPending && (
              <div className="Loader" id="Loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            {Products &&
              Products!
                .slice(0 + 20 * (page - 1), 20 * page)
                .map((item, index) => (
                  <Link
                    key={index}
                    className="mobile-product-card"
                    to={`/Product/${item.id}`}
                    data-aos="fade-up"
                    data-aos-duration="1000"
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
                      <h4>{item.name}</h4>
                      <span>
                        {item.description}
                      </span>
                      <b>&#8358;{formatter.format(Number(item.price))}</b>
                    </div>
                  </Link>
                ))}
          </div>
          {Products && (
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
                    section + 1 > Math.ceil(Products.length / 20)
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
                    section + 2 > Math.ceil(Products.length / 20)
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
                    section >= Math.floor(Products.length / 20)
                      ? "none"
                      : "inline",
                }}
                onClick={() => {
                  setTimeout(() => {
                    setPage(section + 1);
                    setSection(section + 1);
                    window.scrollTo(0, 0);
                    console.log(Products.length / 20);
                  }, 500);
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
        <Footer data={[customerDetails]} />
      </>
    );
                      var random = 0;
                      if (Products) {
                        var [selectedItem] = Products!.filter((item) => {
                          return item.id === Number(id);
                        });
                        random = Math.floor(
                          Math.random() * (Products!.length - 4) + 1
                        );
                      }


      return (
        <>
          <div className="pc">
            <Nav data={[customerDetails, Products]} />
          </div>
          {isPending && (
            <div className="content">
              <div className="mobile-section-container">
                <div className="Loader" id="Loader">
                  <span className="dot"></span>
                  <span className="dot"></span>
                  <span className="dot"></span>
                </div>
              </div>
            </div>
          )}
          {Products && (
            <>
              <img
                src={
                  "https://pretiosusadmin.gibsonline.com/Product_Images/" +
                  selectedItem.image_URL
                }
                alt=""
                className="selected-product-img mobile"
              />
              <div className="productpage-content">
                <div className="selected-product-details">
                  <div className="align-verti-center">
                    <b>&#8358;{formatter.format(Number(selectedItem.price))}</b>
                    <Link to={"/Product"}>
                      <img src="\src\assets\Share.png" alt="" />
                    </Link>
                  </div>
                  <h3>{selectedItem.name}</h3>
                  <p>{selectedItem.description}</p>
                  <div className="align-verti-center">
                    <h3>Quantity</h3>
                    <div className="selected-product-count">
                      <img
                        src="\src\assets\Less.svg"
                        alt=""
                        onClick={() => {
                          count === 1 ? 1 : setCount(count - 1);
                        }}
                      />
                      <div>{count}</div>
                      <img
                        src="\src\assets\More.svg"
                        alt=""
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      />
                    </div>
                  </div>
                  {/*                   <div className="selected-product-delivery">
                    <h2>Delivery</h2>
                    <div className="delivery-type">
                      <div>
                        Standard<span>5-7 days</span>
                      </div>
                      <b></b>
                    </div>
                    <div className="delivery-type">
                      <div>
                        Express<span>1-2 days</span>
                      </div>
                      <b></b>
                    </div>
                  </div>
 */}{" "}
                </div>

                <div className="selected-product-details-pc">
                  <div className="content">
                    <img
                      src={
                        "https://pretiosusadmin.gibsonline.com/Product_Images/" +
                        selectedItem.image_URL
                      }
                      alt=""
                    />
                    <div>
                      <h2>{selectedItem.name}</h2>
                      <p>
                        &#8358;{formatter.format(Number(selectedItem.price))}
                      </p>
                      <p className="selected-product-Label-pc">
                        {selectedItem.description}
                      </p>
                      <div className="addCart-containter-pc">
                        <span className="selected-product-count">
                          <span
                            onClick={() => {
                              count === 1 ? 1 : setCount(count - 1);
                            }}
                          >
                            -
                          </span>
                          {count}
                          <span
                            onClick={() => {
                              setCount(count + 1);
                            }}
                          >
                            +
                          </span>
                        </span>
                        <button
                          onClick={() => {
                            addToCart();
                          }}
                        >
                          {Products && (
                            <>
                              {cart.some(
                                (obj) => obj.id === selectedItem.id
                              ) ? (
                                <img
                                  src="\src\assets\check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
                                  style={{ width: "40px" }}
                                />
                              ) : (
                                "Add to cart"
                              )}
                            </>
                          )}
                        </button>

                        {!cart.some((obj) => obj.id === selectedItem.id) && <img
                          src={
                            wishlist.includes(String(selectedItem.id))
                              ? "/src/assets/Path 337.png"
                              : "/src/assets/heartlikw.png"
                          }
                          className="heartBtn"
                          onClick={() => {
                            addToWishlist(true);
                          }}
                          alt=""
                        />}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <h3>Description</h3>
                  <p>{selectedItem.description}</p>
                </div>
                <div>
                  <div className="selected-product-review">
                    <h3>Rating & Reviews</h3>
                  </div>

                  <div className="selected-product-recommend">
                    <h2>You Might Like</h2>

                    <div className="mobile-section-container">
                      {isPending && (
                        <div className="Loader" id="Loader">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </div>
                      )}
                      {Products &&
                        Products!
                          .slice(random, random + 4)
                          .map((item, index) => (
                            <Link
                              key={index}
                              className="mobile-product-card"
                              to={`/Product/${item.id}`}
                              onClick={() => {
                                setCount(1);
                              }}
                            >
                              <div className="image-holder">
                                <img
                                  src={
                                    "https://pretiosusadmin.gibsonline.com/Product_Images/" +
                                    item.image_URL
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="product-details">
                                <h4>{item.name}</h4>
                                <span>{item.description}</span>
                                <b>
                                  &#8358;{formatter.format(Number(item.price))}
                                </b>
                              </div>
                            </Link>
                          ))}
                      {Products && (
                        <Link to={"/Product"} className="seeAllBtn pc">
                          Show More
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          {Products && (
            <footer className="productpage-footer">
              {!cart.some((obj) => obj.id === selectedItem.id) && <img
                src={
                  wishlist.includes(String(selectedItem.id))
                    ? "/src/assets/Path 337.png"
                    : "/src/assets/heartlikw.png"
                }
                className="heartBtn"
                onClick={() => {
                  addToWishlist(true);
                }}
                alt=""
              />}
              <button className="addCart" onClick={addToCart}>
                {Products && (
                  <>
                    {cart.some((obj) => obj.id === selectedItem.id) ? (
                      <img
                        src="\src\assets\check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
                        style={{ width: "40px" }}
                      />
                    ) : (
                      "Add to cart"
                    )}
                  </>
                )}
              </button>
              <button
                className="buyNow"
                onClick={() => {
                  addToCart();
                  navigate("/cart");
                }}
              >
                Buy now
              </button>
            </footer>
          )}
          <Footer data={[customerDetails]} />
        </>
      );
  };

  export default ProductPage;
