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
  id: Number;
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

  const { id } = useParams();
  console.log(id);
  
  const [selectedItem] = forYouData.filter((item) => {
    return item.id === Number(id);
    
  });
  return (
    <>
    <Nav />
      <img src={selectedItem.Image} alt="" className="selected-product-img" />
      <div className="productpage-content">
        <div className="selected-product-details">
          <div className="align-verti-center">
            <b>{selectedItem.Price}</b>
            <img src="\src\assets\Share.png" alt="" />
          </div>
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

          <div className="selected-product-review">
            <h2>Rating & Reviews</h2>
          </div>

          <div className="selected-product-recommend">
            <h2>You Might Link</h2>

            <div className="mobile-section-container">
              {forYouData.map((item, index) => (
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
            </div>
          </div>
        </div>
      </div>
      <footer className="productpage-footer">
        <img src="\src\assets\Path 337.png" alt="" />
        <button className="addCart">Add to cart</button>
        <button className="buyNow">Buy now</button>
      </footer>
      <Footer />
    </>
  );
};

export default ProductPage;
