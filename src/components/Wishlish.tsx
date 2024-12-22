  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import Footer from "./Footer";
  import Nav from "./Nav";

  interface wishProps {
    data: [
      customerDetails: CustomerDetails,
      Products: ProductItem[] | null,
      isPending: boolean,
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



const Wishlist = (props: wishProps) => {
  const { data } = props;
  const [customerDetails, Products, isPending] = data;
  const [page, setPage] = useState(1);
  const [section, setSection] = useState(1);
    const formatter = new Intl.NumberFormat("en-US");
    
var wishlist: ProductItem[] = [];

console.log(customerDetails);


if (Products) {
  wishlist = Products?.filter((item) => {
    return customerDetails.wishlist.some((id) => Number(id) == item.id);
  });
  console.log(wishlist);
} 
 


  return (
    <>
      <Nav data={[customerDetails, Products]} />
      <div className="content">
        <div className="ordersContainer">
          <h2>Wishlist ({wishlist!.length})</h2>
        </div>
        <p>&nbsp;</p>
        <div className="mobile-section-container">
          {isPending && (
            <div className="Loader" id="Loader">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
          {Products &&
            wishlist!
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
                    <span>{item.description}</span>
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
                  section + 1 > Math.ceil(wishlist!.length / 20)
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
                  section + 2 > Math.ceil(wishlist!.length / 20)
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
                  section >= Math.floor(wishlist!.length / 20)
                    ? "none"
                    : "inline",
              }}
              onClick={() => {
                setTimeout(() => {
                  setPage(section + 1);
                  setSection(section + 1);
                  window.scrollTo(0, 0);
                  console.log(wishlist!.length / 20);
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
};
 
export default Wishlist;