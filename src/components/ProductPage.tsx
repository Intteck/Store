import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import "./ProductPage.css"

interface productProps {
  data: [
    forYouData: CategoryItem[],
    categoriesItems: Categories,
    categoriesNames: CategoryKey[]
  ];
}

type CategoryItem = {
  id: number;
  title: string;
  Image: string;
  Label: string;
  Price: string;
};

type CategoryKey = "Clothing" | "Shoes" | "Phones" | "Cars";

type Categories = {
  [key in CategoryKey]: CategoryItem[];
};

const ProductPage = (props: productProps) => {
    const [count,setCount] = useState(0);
  const { data } = props;
  const [forYouData] = data;

const cart = [
  { id: 1, count: 3 },
  { id: 4 , count: 3 },
  { id: 5, count: 3 },
];
  const { id } = useParams();
  console.log(id);
  
  const [selectedItem] = forYouData.filter((item) => {
    return item.id === Number(id);
    
  });
  if (id === undefined)
  return (
    <>
      <Nav />
      <div className="content">
        <div className="mobile-section-container">
          {forYouData.map((item, index) => (
            <Link
              key={index}
              className="mobile-product-card"
              to={`/Product/${item.id}`}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={100 * index}
            >
              <div className="image-holder">
                <img src={item.Image} alt={item.Label} />
              </div>
              <div className="product-details">
                <h4>{item.title}</h4>
                <span>{item.Label}</span>
                <b>{item.Price}</b>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );



    return (
      <>
        <img
          src={selectedItem.Image}
          alt=""
          className="selected-product-img mobile"
        />
        <div className="productpage-content">
          <div className="selected-product-details">
            <div className="align-verti-center">
              <b>{selectedItem.Price}</b>
              <img src="\src\assets\Share.png" alt="" />
            </div>
            <h3>{selectedItem.title}</h3>
            <p>{selectedItem.Label}</p>
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
              <img src={selectedItem.Image} alt="" />
              <div>
                <h2>{selectedItem.title}</h2>
                <p>{selectedItem.Price}</p>
                <p className="selected-product-Label-pc">
                  {selectedItem.Label}
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
            <p>{selectedItem.Label}</p>
          </div>
          <div>
            <div className="selected-product-review">
              <h3>Rating & Reviews</h3>
            </div>

            <div className="selected-product-recommend">
              <h2>You Might Link</h2>

              <div className="mobile-section-container">
                {forYouData.slice(0, 4).map((item, index) => (
                  <Link
                    key={index}
                    className="mobile-product-card"
                    to={`/Product/${item.id}`}
                  >
                    <div className="image-holder">
                      <img src={item.Image} alt={item.Label} />
                    </div>
                    <div className="product-details">
                      <h4>{item.title}</h4>
                      <span>{item.Label}</span>
                      <b>{item.Price}</b>
                    </div>
                  </Link>
                ))}
                <Link to={"/Product"} className="seeAllBtn pc">
                  Show More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <footer className="productpage-footer">
          <img src="\src\assets\Path 337.png" alt="" />
          <button className="addCart">
            {cart.some((obj) => obj.id === selectedItem.id) ? (
              <img
                src="\src\assets\check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
                style={{ width: "40px" }}
              />
            ) : (
              "Add to cart"
            )}
          </button>
          <button className="buyNow">Buy now</button>
        </footer>
        <Footer />
      </>
    );
};

export default ProductPage;
