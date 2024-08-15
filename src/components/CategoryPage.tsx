import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./CategoryPage.css"
import Nav from "./Nav";
import Footer from "./Footer";
interface shopProps {
  data: [Products: ProductItem[] | null, 
  categoriesNames: CategoryKey[],
  isPending: boolean],
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

type CategoryKey ="Tvs" | "Refrigerators" | "Freezers" | "Air Conditioners" | "Washing Machines" | "Microwaves Oven" |"Small Home Appliances" |"Phones" |"Accessories"| "Laptops";


const CategoryPage = (props: shopProps) => {
  const { data } = props;
  const [arrow, setArrowActive] = useState(false);
const [Products, categoriesNames, isPending] = data;
  const { category } = useParams();
    const [page, setPage] = useState(1);
    const [section, setSection] = useState(1);
const formatter = new Intl.NumberFormat("en-US");

  console.log(category);
  
  const categoryKey = category as CategoryKey;
const filteredProducts = Products && Products!.filter((item) => {
  return item.product_Type[0].name.trim() === categoryKey;
});
const displayImg = [''];
 if (category === undefined) {
    return (
      <>
        <Nav />
        <div className="content">
          <div className="mobile-categorypage-list">
            {categoriesNames.map((item, index) => (
              <Link
                to={`/categories/${item}`}
                className="mobile-categorypage-item"
              >
                <div>
                  <img src={displayImg[index]} alt="" /> {item}
                </div>
                <img
                  src="src/assets/Icon Arrow.png"
                  alt="arrow"
                  className={arrow ? "Arrow" : "Arrow active"}
                  onClick={() => {
                    setArrowActive(!arrow);
                  }}
                />{" "}
              </Link>
            ))}
            <div className="mobile-categorypage-item">
              <div>
                <img
                  src="/src/assets/45D808E0-5E00-4D2A-9BDC-5ED6F427010E.png"
                  alt=""
                />
                <h3 className="foryou-heading">Just For You</h3>
              </div>

            <Link to={"/Product"} className="seeAllBtn mobile">
                <img src="\src\assets\Arrow.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }


  return (
    <>
      <Nav />
      <div className="content">
        <div className="all-products-list">
          <div className="mobile-section-container">
            {isPending && (
              <div className="Loader" id="Loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}

            {Products &&
              filteredProducts!.slice(0 + 20 * (page - 1), 20 * page)
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
                    {filteredProducts && <div className="product-pagination" >
            <button style={{display: section === 1 ? "none":"inline"}} onClick={()=>{setPage(section-1); setSection(section-1)}}>Previous</button>
            <button className={page === section?"active":""} onClick={()=>{setPage(section);}}>{section}</button>
            <button className={page === section+1?"active":""} style={{display: section+1 > Math.ceil(filteredProducts.length/20) ? "none":"inline"}} onClick={()=>{setPage(section+1)}}>{section+1}</button>
            <button className={page === section+2?"active":""} style={{display: section === Math.floor(filteredProducts.length/20) ? "none":"inline"}}  onClick={()=>{setPage(section+2)}}>{section+2}</button>
            <button style={{display: section >= Math.floor(filteredProducts.length/20) ? "none":"inline"}} onClick={()=>{setPage(section+1); setSection(section+1); console.log(Products.length/20)}}>Next</button>
          </div>}

        </div>
      </div>
      <Footer />
    </>
  );
}; 

export default CategoryPage;
