import React, { useState } from "react";
import "./CheckoutPage.css";
import Footer from "./Footer";
import Nav from "./Nav";
const CheckoutPage = () => {
    const [billVisible, setBillVisible] = useState(false);
    const [arrow, setArrowActive] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("method1"); // State to track selected payment method

    return (
      <>
      <Nav />
        <div className="content">
          <div className="checkoutPage">
            <div
              className={!billVisible ? "Billing-info" : "Billing-info active"}
            >
              <h2>
                Billing details &nbsp;{" "}
                <img
                  src="src/assets/Icon Arrow.png"
                  alt="arrow"
                  className={!arrow ? "Arrow" : "Arrow active"}
                  onClick={() => {
                    setBillVisible(!billVisible);
                    setArrowActive(!arrow);
                  }}
                />
              </h2>
              <div className="name-info">
                <div>
                  <h4>First Name</h4>
                  <input type="text" />
                </div>
                <div>
                  <h4>Last Name</h4>
                  <input type="text" />
                </div>
              </div>
              <div className="billing-data">
                <h4>Company Name (Optional)</h4>
                <input type="text" />
              </div>
              <div className="billing-data">
                <h4>Country / Region</h4>
                <select name="" id="">
                  <option value="">Siri Larika</option>
                  <option value="">Siri Larika</option>
                  <option value="">Siri Larika</option>
                </select>
              </div>
              <div className="billing-data">
                <h4>Street Address</h4>
                <input type="text" />
              </div>
              <div className="billing-data">
                <h4>Town / City</h4>
                <input type="text" />
              </div>
              <div className="billing-data">
                <h4>Province</h4>
                <select name="" id="">
                  <option value="">Western Province</option>
                  <option value="">Siri Larika</option>
                  <option value="">Siri Larika</option>
                </select>
              </div>
              <div className="billing-data">
                <h4>Zip code</h4>
                <input type="number" name="" id="" />
              </div>
              <div className="billing-data">
                <h4>Phone</h4>
                <input type="number" />
              </div>
              <div className="billing-data">
                <h4>Email address</h4>
                <input type="Email" />
              </div>

              <div className="billing-data">
                <h4> </h4>
                <input type="text" placeholder="Additional information" />
              </div>
            </div>
            <div className="checkout-summary">
              <div className="checkout-data">
                <h3>Product</h3>
                <h3>Subtotal</h3>
              </div>
              <div className="checkout-data">
                <span></span>
                <span>Rs.250,000.00</span>
              </div>
              <div className="checkout-data">
                <span>Subtotal</span>
                <span>Rs.250,000.00</span>
              </div>
              <div className="checkout-data">
                <span>Total</span>
                <span className="total-price">Rs.250,000.00</span>
              </div>
              <hr />
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="payment1"
                  checked={selectedPaymentMethod === "method1"}
                  onChange={() => setSelectedPaymentMethod("method1")}
                />
                <span>&nbsp;Direct Bank Transfer</span>
                <span
                  className={`payment-description ${
                    selectedPaymentMethod === "method1" ? "visible" : "hidden"
                  }`}
                >
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </span>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="payment2"
                  checked={selectedPaymentMethod === "method2"}
                  onChange={() => setSelectedPaymentMethod("method2")}
                />
                <span>&nbsp;Direct Bank Transfer</span>
                <span
                  className={`payment-description ${
                    selectedPaymentMethod === "method2" ? "visible" : "hidden"
                  }`}
                >
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </span>
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="payment3"
                  checked={selectedPaymentMethod === "method3"}
                  onChange={() => setSelectedPaymentMethod("method3")}
                />
                <span>&nbsp;Cash on Delivery</span>
                <span
                  className={`payment-description ${
                    selectedPaymentMethod === "method3" ? "visible" : "hidden"
                  }`}
                >
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </span>
              </div>
              <p>
                our personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our <b>privacy policy.</b>
              </p>
              <button className="orderbtn">Place Order</button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}
 
export default CheckoutPage;