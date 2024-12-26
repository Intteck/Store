import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { Link} from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "/node_modules/swiper/swiper-bundle.min.css";

interface homeProps {
  data: [
        customerDetails: CustomerDetails,
    Products: ProductItem[] | null,
    categoriesNames: CategoryKey[],
    isPending: boolean,
  ]
};

type ProductItem = {
  id: number;
  name: string;
  description: string;
  image_URL: string;
  product_Type: productType[];
  price: number;
  suppliers: [];
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


type productType = {
  id: number;
  name: string;
  description: string;
};

type CategoryKey ="Refrigerators" | "Freezers" | "Air Conditioners" | "Washing Machines" | "Microwaves Oven" |"Small Home Appliances" |"Phones" |"Accessories"| "Laptops" | "Tvs" ;

const HomePage = (props: homeProps) => {
  const formatter = new Intl.NumberFormat("en-US");
const {data} = props;
const [customerDetails, Products, categoriesNames, isPending] = data;
  var random = 0;

                  if (Products) {
                    random = Math.floor(
                      Math.random() * (Products!.length - 4) 
                    );
                  }

  const [alertSlide, setSlide] = useState(1);
useEffect(() => {
  const interval = setInterval(() => {
    setSlide((prevState) => (prevState === 1 ? 2 : 1));
  }, 5000); // 3000 milliseconds = 3 seconds

  // Cleanup to avoid memory leaks
  return () => clearInterval(interval);
}, []);
  return (
    <>
      <Nav data={[customerDetails, Products]} />
      <div>
        <div className="Hero-image pc">
          <div
            className={
              alertSlide === 1 ? "update-alert" : "update-alert active"
            }
          >
            <span>New Arrival</span>
            <h1>
              Discover Our <br></br>New Collection
            </h1>
            <span>Get the best deals on your favourite products!!!</span>
            <Link to={"/Product"}>
              <button>Buy Now</button>
            </Link>
          </div>
          <div
            className={
              alertSlide === 2 ? "update-alert" : "update-alert active"
            }
          >
            <span>Exclusive Offer</span>
            <h1>
              Become a <br />
              Vendor Today
            </h1>
            <span>Join now and enjoy exclusive benefits and discounts!</span>
            <Link to={"/Membership"}>
              <button>Join Now</button>
            </Link>
          </div>{" "}
        </div>
        <div className="swiper-container">
          <Swiper
            className="Hero-slideshow"
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={1000}
            modules={[Pagination, Autoplay]}
            onSwiper={(swiper: any) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={index} className={"slide" + (index + 1)}>
                <img
                  src={"src/assets/Banner (" + (index + 1) + ").png"}
                  alt=""
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <section className="Homecontent align">
          <div className="mobile-section-header">
            <h3>Categories</h3>
            <div>
              <span>See All</span>
              <Link to={"/Search"} className="seeAllBtn">
                <img src="\src\assets\Arrow.png" alt="" />
              </Link>
            </div>
          </div>
          <div className="mobile-section-container">
            {isPending && (
              <div className="Loader" id="Loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            {Products &&
              categoriesNames.slice(0, 4).map((category, index) => (
                <Link
                  to={`/categories/${category}`}
                  key={category}
                  className="mobile-categories-card"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={50 * index}
                >
                  <div>
                    {Products &&
                      Products!
                        .filter((item) => {
                          return item.product_Type[0].name == category;
                        })
                        .slice(0, 4)
                        .map((item, index) => (
                          <img
                            key={index}
                            src={
                              "https://pretiosusapi.gibsonline.com/uploads/" +
                              item.image_URL
                            }
                            alt={item.name}
                          />
                        ))}
                  </div>
                  <span>{category}</span>
                </Link>
              ))}
            {Products && (
              <Link to={"/Search"} className="seeAllBtn pc">
                See All
              </Link>
            )}
          </div>

          <div className="mobile-section-header">
            <h3 className="foryou-heading">Just For You</h3>
            <div>
              <span>See All</span>
              <Link to={"/Product"} className="seeAllBtn">
                <img src="\src\assets\Arrow.png" alt="" />
              </Link>
            </div>
          </div>

          <div className="mobile-section-container">
            {isPending && (
              <div className="Loader" id="Loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            {Products &&
              Products!.slice(random, random + 4).map((item, index) => (
                <Link
                  key={index}
                  className="mobile-product-card"
                  to={`/Product/${item.id}`}
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={100 * index}
                >
                  <div className="image-holder">
                    <img
                      src={
                        "https://pretiosusapi.gibsonline.com/uploads/" +
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
            {Products && (
              <Link to={"/Product"} className="seeAllBtn pc">
                Show More
              </Link>
            )}
          </div>
        </section>
      </div>
      <Footer data={[customerDetails]} />
    </>
  );
};

export default HomePage;
