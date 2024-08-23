import React from "react";
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


  return (
    <>
      <Nav data={[customerDetails]} />
      <div>
        <div className="Hero-image pc">
          <div
            className="update-alert"
            data-aos="fade-up"
            data-aos-duration="1000"
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
        </div>
        <section className="content align">
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
                <SwiperSlide className={"slide"+(index+1)}>
                  <img src={"https://pretiosusadmin.gibsonline.com/Product_Images/banner/"+(index+1)+".jpg"} alt="" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

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
                              "https://pretiosusadmin.gibsonline.com/Product_Images/" +
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
