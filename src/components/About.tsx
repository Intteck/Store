import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Footer from "./Footer";
import Nav from "./Nav";

 interface Props {
   data: [customerDetails: CustomerDetails];
 }

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


const About = (props: Props) => {
        const { data } = props;
        const [customerDetails] = data; 

  return (
    <>
      <Nav data={[customerDetails]} />
      <div className="About-container">
        <Link
          to={"/Home"}
          data-aos="fade-in"
          data-aos-duration="2000"
          data-aos-delay="600"
        >
          <img src="src\assets\Pretiosus 1.png" alt="" />
        </Link>
        <h1
          className="About-header"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          ABOUT <span>US</span>
        </h1>
        <p data-aos="fade-in" data-aos-duration="2000" data-aos-delay="400">
          Be the driving force behind innovative product experiences that not
          only meet customer needs but exceed expectations. Transform market
          opportunities into sustained growth and long-term customer loyalty.
          Take charge of your finances today! Visit the Pretiosus app (web or
          mobile) to explore our wide range of products. Find your desired item,
          check its properties, and start planning your installment now.
        </p>
        <div className="About-options">
          <div data-aos="fade-up" data-aos-duration="1000" className="option">
            <button className="option-icon">
              <img
                src="\src\assets\groups_27dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                alt=""
              />
            </button>
            <span>
              <h4 className="option-header">Our Office</h4>
              <p className="option-text">
                You can visit us at our office. Block A2 Suite 12FF Aregbeshola
                shopping mall Pako Bus stop, Alimosho-Ipaja Road, Lagos.
              </p>
            </span>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="option"
            data-aos-delay="300"
          >
            <button className="option-icon">
              <img
                src="\src\assets\call_27dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                alt=""
              />
            </button>
            <span>
              <h4 className="option-header">Help Desk</h4>
              <p className="option-text">
                You can reach out via call or sms or Whatsapp any day, anytime.
                <a href="tel:+234(0)7010774262">+234(0)7010774262</a>
              </p>
            </span>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="option"
            data-aos-delay="400"
          >
            <button className="option-icon">
              <img
                src="\src\assets\mail_27dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png"
                alt=""
              />
            </button>
            <span>
              <h4 className="option-header">Our Mail</h4>
              <p className="option-text">
                Your also mail us{" "}
                <a href="mailto:info@pretiosus.ng">info@pretiosus.ng</a>
              </p>
            </span>
          </div>
        </div>
      </div>
      <Footer data={[customerDetails]} />
    </>
  );
};
 
export default About;