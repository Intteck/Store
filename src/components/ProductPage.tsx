  import React, { useState } from "react";
  import { Link, useParams } from "react-router-dom";
  import Footer from "./Footer";
  import Nav from "./Nav";
  import "./ProductPage.css"

  interface productProps {
    data: [Products: ProductItem[] | null,
  isPending: boolean];
  }

  type ProductItem = {
    id: number;
    name: string;
    description: string;
    image_URL: string;
    product_Type: productType[];
    price: number;
  };

  type productType = {
    id: number;
    name: string;
    description: string;
  };



  const ProductPage = (props: productProps) => {
    const [heart,setHeart] = useState(true);
      const [count,setCount] = useState(0);
    const { data } = props;
  const [Products,isPending] = data;
  const [page,setPage] = useState(1);
  const [section,setSection] = useState(1);

  const cart = [
    { id: 1, count: 3 },
    { id: 4 , count: 3 },
    { id: 5, count: 3 },
  ];

  const { id } = useParams();
    console.log(id);
    
    if (id === undefined)
    return (
      <>
        <Nav />
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
                          "http://pretiosusadmin.gibsonline.com/Product_Images/" +
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
                      <b>&#8358;{item.price}</b>
                    </div>
                  </Link>
                ))}
          </div>
          {Products && <div className="product-pagination" >
            <button style={{display: section === 1 ? "none":"inline"}} onClick={()=>{setPage(section-1); setSection(section-1)}}>Previous</button>
            <button className={page === section?"active":""} onClick={()=>{setPage(section);}}>{section}</button>
            <button className={page === section+1?"active":""} style={{display: section+1 > Math.ceil(Products.length/20) ? "none":"inline"}} onClick={()=>{setPage(section+1)}}>{section+1}</button>
            <button className={page === section+2?"active":""} style={{display: section === Math.floor(Products.length/20) ? "none":"inline"}}  onClick={()=>{setPage(section+2)}}>{section+2}</button>
            <button style={{display: Math.floor(Products.length/20) === section || Math.floor(Products.length/20) <= 0 ? "none":"inline"}} onClick={()=>{setPage(section+1); setSection(section+1); console.log(Products.length/20)}}>Next</button>
          </div>}
        </div>
        <Footer />
      </>
    );

                  var random = 0;

  if (Products) {
      var [selectedItem] = Products!.filter((item) => {
        return item.id === Number(id);
      });
              random = Math.floor(Math.random() * (Products!.length - 4) + 1);

  }

      return (
        <>
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
                  "http://pretiosusadmin.gibsonline.com/Product_Images/" +
                  selectedItem.image_URL
                }
                alt=""
                className="selected-product-img mobile"
              />
              <div className="productpage-content">
                <div className="selected-product-details">
                  <div className="align-verti-center">
                    <b>&#8358;{selectedItem.price}</b>
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
                          count === 0 ? 0 : setCount(count - 1);
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
                  <div>
                    <img
                      src={
                        "http://pretiosusadmin.gibsonline.com/Product_Images/" +
                        selectedItem.image_URL
                      }
                      alt=""
                    />
                    <div>
                      <h2>{selectedItem.name}</h2>
                      <p>&#8358;{selectedItem.price}</p>
                      <p className="selected-product-Label-pc">
                        {selectedItem.description}
                      </p>
                      <div className="addCart-containter-pc">
                        <span className="selected-product-count">
                          <span
                            onClick={() => {
                              count === 0 ? 0 : setCount(count - 1);
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
                        <button>Add To Cart</button>
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
                            >
                              <div className="image-holder">
                                <img
                                  src={
                                    "http://pretiosusadmin.gibsonline.com/Product_Images/" +
                                    item.image_URL
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="product-details">
                    <h4 className="mobile">{item.name.slice(0, 15)}...</h4>
                    <h4 className="pc">{item.name.slice(0, 25)}...</h4>
                    <span className="mobile">{item.description.slice(0, 23)}...</span>
                    <span className="pc">{item.description.slice(0, 40)}...</span>
                                <b>&#8358;{item.price}</b>
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
            <button className="addCart">
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
            <button className="buyNow">Buy now</button>
          </footer>
          <Footer />
        </>
      );
  };

  export default ProductPage;
