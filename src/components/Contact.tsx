import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import "./Contact.css";
interface Props {
  data: [
    customerDetails: CustomerDetails
  ];
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



const Contact = (props:Props) => {
          const { data } = props;
        const [customerDetails] = data;

    return (
      <>
        <Nav data={[customerDetails]} />
        <div className="contact-container">
          <h1
            className="contact-header"
            data-aos="fade-in"
            data-aos-duration="2000"
          >
            Our Support Team is Always Here to Help
          </h1>
          <form action="/submit-form" method="post" className="contact-form">
            <h3 data-aos="fade-in" data-aos-duration="2000">
              We would love to hear from <span>you!</span>
            </h3>
            <div data-aos="fade-up" data-aos-duration="1000">
              <span>Full Name</span>
              <input type="text" placeholder="Enter Full Name" required />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="100"
            >
              <span>Email Address</span>
              <input type="email" placeholder="Enter Email Address" required />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <span>Phone Number</span>
              <input type="number" placeholder="Enter Phone Number" required />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <span>Message</span>
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder="What would you like to tell us?"
                required
              ></textarea>
            </div>
            <div
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              <button className="contact-btn">
                Send message
                <img src="\src\assets\Arrow.png" alt="" />
              </button>
            </div>
          </form>
        </div>
        <Footer data={[customerDetails]} />
      </>
    );
}
 
export default Contact;