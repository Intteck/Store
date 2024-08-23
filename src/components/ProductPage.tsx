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
      setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>
    ];
  }

  type ProductItem = {
    id: number;
    name: string;
    description: string;
    image_URL: string;
    product_Type: productType[];
    price: number;
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
  email: string;
  phone_number: string;
  address: string;
  country: string;
  state: string;
  city: string;
};


  const ProductPage = (props: productProps) => {
    const [heart,setHeart] = useState(true);
      const [count,setCount] = useState(1);
    const { data } = props;
    const formatter = new Intl.NumberFormat("en-US");
  const [customerDetails, Products, isPending, cart, setCartItems] = data;
  const [page,setPage] = useState(1);
  const [section,setSection] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = Cookies.get("cartItems"+customerDetails.id);
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);


  const addToCart = () => {
    if(!cart.some((obj) => obj.id === selectedItem.id)){    
    const item = {id:selectedItem.id, count: count}
    const updatedCartItems = [...cart, item];
    setCartItems(updatedCartItems);

    Cookies.set("cartItems"+customerDetails.id, JSON.stringify(updatedCartItems), { expires: 30 });}
    else
    console.log(Cookies.get("cartItems" + customerDetails.id));
    
  };


  const { id } = useParams();
    console.log(id);
    if (id === undefined)
    return (
      <>
        <Nav data={[customerDetails]} />
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
                      <h4 className="mobile">{item.name.slice(0, 15)}...</h4>
                      <h4 className="pc">{item.name.slice(0, 25)}...</h4>
                      <span className="mobile">
                        {item.description.slice(0, 23)}...
                      </span>
                      <span className="pc">
                        {item.description.slice(0, 40)}...
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
                    section === Math.floor(Products.length / 20)
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
                    Math.floor(Products.length / 20) === section ||
                    Math.floor(Products.length / 20) <= 0
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
            <Nav data={[customerDetails]} />
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
                  <div className="selected-product-delivery">
                    <h2>Delivery</h2>
                    <div className="delivery-type">
                      <div>
                        Standard<span>5-7 days</span>
                      </div>
                      <b>$3.00</b>
                    </div>
                    <div className="delivery-type">
                      <div>
                        Express<span>1-2 days</span>
                      </div>
                      <b>$12.00</b>
                    </div>
                  </div>
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
                        <button onClick={addToCart}>
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
                                <h4 className="mobile">
                                  {item.name.slice(0, 15)}...
                                </h4>
                                <h4 className="pc">
                                  {item.name.slice(0, 25)}...
                                </h4>
                                <span className="mobile">
                                  {item.description.slice(0, 23)}...
                                </span>
                                <span className="pc">
                                  {item.description.slice(0, 40)}...
                                </span>
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
          <footer className="productpage-footer">
            <img
              src={
                heart ? "/src/assets/Path 337.png" : "/src/assets/heartlikw.png"
              }
              className="heartBtn"
              onClick={() => {
                setHeart(!heart);
              }}
              alt=""
            />
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
            <button className="buyNow" onClick={()=>{addToCart(); navigate("/cart")}}>Buy now</button>
          </footer>
          <Footer data={[customerDetails]} />
        </>
      );
  };

  export default ProductPage;
