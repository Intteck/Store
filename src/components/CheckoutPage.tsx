import React, { useState } from "react";
import "./CheckoutPage.css";
import Footer from "./Footer";
import Nav from "./Nav";
import PaystackPop from "@paystack/inline-js";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

interface checkoutProps {
  data: [
    Products: ProductItem[] | null,
    isPending: boolean,
    customerDetails: CustomerDetails,
    cart: CartItem[],
    setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>,
    setCustomerDetails: React.Dispatch<React.SetStateAction<CustomerDetails>>
  ];
}
type CartItem = {
  id: number;
  count: number;
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

const CheckoutPage = (Props: checkoutProps) => {
  const { data } = Props;
      const [failReq, setFailReq] = useState(false);
      const [reqPend, setReqPend] = useState(false);
      const [successReq, setSuccessReq] = useState(false);
        const [useWalletActive, setUseWalletActive] = useState(false);
  const navigate = useNavigate();

  const [Products, isPending, customerDetails, cart, setCartItems,setCustomerDetails] = data;

  const formatter = new Intl.NumberFormat("en-US");
  if (Products) {
    var Total = Products!
      .filter((item) => {
        return cart.some((obj) => obj.id === item.id);
      })
      .reduce(
        (sum, item) =>
          sum + cart.find((tem) => tem.id === item.id)?.count! * item.price,
        0
      );
  } else {
    var Total = 0;
  }
  const [billVisible, setBillVisible] = useState(false);
  const [arrow, setArrowActive] = useState(false);

  const [orders, setOrders] = useState({
    custId: customerDetails.id,
    productIds: cart.flatMap((product) => Array(cart.find((tem) => tem.id === product.id)?.count!).fill(product.id)),
    orderDate: new Date().toISOString(),
    orderTotal: Total,
    status: "pending",
    trans_id: 0,
    payment_id: 0,
    fop: 0,   
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("method1"); // State to track selected payment method

  const publicKey = "pk_test_4a431544da49620191857b0c73a96f0a38760af1";


  const covePayment = () =>{
        setSuccessReq(false);
        setFailReq(false)
        setReqPend(true);
if(customerDetails.wallet_amt>=Total)
{
         fetch(
           "https://pretiosusapi.gibsonline.com/api/Customers/" +
             customerDetails.id,
           {
             method: "PATCH",
             headers: {
               "Content-Type": "application/json",
             },
             body: JSON.stringify({...customerDetails,
               wallet_amt: Number(customerDetails.wallet_amt - Total)
             }),
           }
         )
           .then((response) => {
             if (!response.ok) {
               return response.json().then((error) => {
                 throw new Error(`Failed to send details. ${error.message}`);
               });
             }
           })
           .then((data) => {
             Cookies.set(
               "customerDetails",
               JSON.stringify({
                 ...customerDetails,
                 wallet_amt: customerDetails.wallet_amt - Total,
               }),
               {
                 expires: 7,
               }
             );
  setCustomerDetails({
    ...customerDetails,
    wallet_amt: customerDetails.wallet_amt - Total,
  });
             setSuccessReq(true);
         setReqPend(false);
             console.log("Data has been sent", data);
           })
           .catch((error) => {
           setReqPend(false);
             console.error("Error sending info:", error);
           });

        const updatedOrder = {
          ...orders,
          status: "pending",
          payment_id: 123456789, // Extracting the first 9 digits for payment_id
          trans_id: 987654321, // Extracting the first 9 digits of the reference (excluding the first character)
        };

        setOrders(updatedOrder);


            if (
              updatedOrder.custId &&
              updatedOrder.productIds.length > 0 &&
              updatedOrder.orderDate &&
              updatedOrder.orderTotal > 0 &&
              updatedOrder.status &&
              updatedOrder.payment_id &&
              updatedOrder.trans_id
            ) {
              console.log("Orders to be sent:", updatedOrder);

              fetch("https://pretiosusapi.gibsonline.com/api/Orders", {
                method: "POST",
                headers: {
                  accept: "*/*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedOrder),
              })
                .then((response) => {
                  if (!response.ok) {
                    return response.json().then((error) => {
                      throw new Error(
                        `Failed to send orders. ${error.message}`
                      );
                    });
                  }
                })

                .then((data) => {
                  console.log(updatedOrder);
                  console.log("orders has been sent", data);
                  Cookies.remove("cartItems" + customerDetails.id);
                  Cookies.remove("cartItems0");
                  setCartItems([]);
                  navigate("/Home");
                })
                .catch((error) => {
                  console.error("Error sending info:", error);
                });
            } else {
              console.error("Order details are incomplete:", updatedOrder);
            }
}
else{
   setFailReq(true);
  setReqPend(false);
}
  }

  const makePayment = () => {
    const popup = new PaystackPop();

    popup.newTransaction({
      key: publicKey,
      email: customerDetails.email,
      amount: Total * 100,
      onSuccess: (transaction: any) => {
        console.log(transaction);

        const updatedOrder = {
          ...orders,
          status: transaction.status,
          payment_id: Number(transaction.trans.slice(0, 9)), // Extracting the first 9 digits for payment_id
          trans_id: Number(transaction.reference.substring(1).slice(0, 9)), // Extracting the first 9 digits of the reference (excluding the first character)
        };

          setOrders(updatedOrder);

        if (
          updatedOrder.custId &&
          updatedOrder.productIds.length > 0 &&
          updatedOrder.orderDate &&
          updatedOrder.orderTotal > 0 &&
          updatedOrder.status &&
          updatedOrder.payment_id &&
          updatedOrder.trans_id
        ) {
          console.log("Orders to be sent:", updatedOrder);

          fetch("https://pretiosusapi.gibsonline.com/api/Orders", {
            method: "POST",
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrder),
          })
            .then((response) => {
              if (!response.ok) {
                return response.json().then((error) => {
                  throw new Error(`Failed to send orders. ${error.message}`);
                });
              }
            })

            .then((data) => {
              console.log(updatedOrder);
              console.log("orders has been sent", data);
              Cookies.remove("cartItems" + customerDetails.id);
              Cookies.remove("cartItems0");
              setCartItems([]);
              navigate("/Home");
            })
            .catch((error) => {
              console.error("Error sending info:", error);
            });
        } else {
          console.error("Order details are incomplete:", updatedOrder);
        }
      },
      onLoad: (response: any) => {
        console.log("onLoad: ", response);
      },
      onCancel: () => {
        console.log("onCancel");
      },
      onError: (error: { message: any }) => {
        console.log("Error: ", error.message);
      },
    });
  };

  return (
    <>
      <Nav data={[customerDetails, Products]} />
      <div className="content">
        <div className="mobile-section-container">
          {isPending && Total === 0 && (
            <div className="Loader" id="Loader">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>

        {Products && Total !== 0 && (
          <div className="checkoutPage">
            <div
              className={!billVisible ? "Billing-info" : "Billing-info active"}
            >
              <h2>
                Billing details &nbsp;
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
                  <input readOnly type="text" value={customerDetails.first_name} />
                </div>
                <div>
                  <h4>Last Name</h4>
                  <input readOnly type="text" value={customerDetails.last_name} />
                </div>
              </div>
              <div className="billing-data">
                <h4>Country / Region</h4>
                <input readOnly type="text" value={customerDetails.country} />
              </div>
              <div className="billing-data">
                <h4>Street Address</h4>
                <input readOnly type="text" value={customerDetails.address} />
              </div>
              <div className="billing-data">
                <h4>Town / City</h4>
                <input readOnly type="text" value={customerDetails.city} />
              </div>
              <div className="billing-data">
                <h4>State</h4>
                <input readOnly
                  type="text"
                  value={customerDetails.state}
                />
              </div>

              <div className="billing-data">
                <h4>Zip code</h4>
                <input readOnly type="text" value={customerDetails.postalCode} />
              </div>
              <div className="billing-data">
                <h4>Phone</h4>
                <input readOnly type="text" value={customerDetails.phone_number} />
              </div>
              <div className="billing-data">
                <h4>Email address</h4>
                <input readOnly type="text" value={customerDetails.email} />
              </div>

              <div className="billing-data">
                <h4> </h4>
                <input readOnly type="text" placeholder="Additional information" />
              </div>

              <Link to={"/Profile"} className="billBtn">Update Info</Link>
            </div>
            <div className="checkout-summary">
              <div className="checkout-data">
                <h3>Product</h3>
                <h3>Subtotal</h3>
              </div>
              {Products!
                .filter((item) => {
                  return cart.some((obj) => obj.id === item.id);
                })
                .map((item) => (
                  <div className="checkout-data">
                    <span>
                      {item.name} X{" "}
                      {cart.find((tem) => tem.id === item.id)?.count!}
                    </span>
                    <span>
                      {" "}
                      &#8358;
                      {formatter.format(
                        Number(
                          cart.find((tem) => tem.id === item.id)?.count! *
                            item.price
                        )
                      )}
                    </span>
                  </div>
                ))}
              <div className="checkout-data">
                <span>Total</span>
                <span className="total-price">
                  {" "}
                  &#8358;
                  {formatter.format(Total)}
                </span>
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
                <span>&nbsp;Pay With Cash Cove</span>
                <span
                  className={`payment-description ${
                    selectedPaymentMethod === "method2" ? "visible" : "hidden"
                  }`}
                >
                  Make your payment directly from your Cash Cove wallet. Please
                  use your Order ID as the payment reference.
                </span>
              </div>
              <p>
                our personal data will be used to support your experience
                throughout this website, to manage access to your account, and
                for other purposes described in our <b>privacy policy.</b>
              </p>
              {selectedPaymentMethod === "method1" && (
                <button
                  className="orderbtn"
                  onClick={() => {
                    makePayment();
                  }}
                >
                  Place Order
                </button>
              )}
              {selectedPaymentMethod === "method2" && (
                <button
                  className="orderbtn"
                  onClick={() => {
                    setUseWalletActive(true);
                  }}
                >
                  Place Order
                </button>
              )}
            </div>

            {useWalletActive && (
              <>
                <div
                  className="blur"
                  onClick={() => {
                    setUseWalletActive(false);
                    setSuccessReq(false);
                    setReqPend(false);
                  }}
                ></div>
                <div className="moneyBox-container">
                  <div className="moneyimg">
                    <span>
                      <img src="\src\assets\wallet_24dp_261870_FILL0_wght400_GRAD0_opsz24.png" />
                    </span>
                    <p>Wallet Balance:</p>
                    {!successReq ? (
                      <h2>
                        &#8358;{formatter.format(customerDetails.wallet_amt)} -
                        &#8358;{formatter.format(Total)}
                      </h2>
                    ) : (
                      <h2>
                        &#8358;{formatter.format(customerDetails.wallet_amt)}
                      </h2>
                    )}
                    {reqPend && (
                      <div className="loading-screen">
                        <div className="loader"></div>
                      </div>
                    )}
                  </div>
                  {successReq && (
                    <p className="Request-alert">
                      &nbsp;Cash Cove Funded{" "}
                      <img src="\src\assets\greenCheck.png" alt="" />
                    </p>
                  )}
                  {failReq && (
                    <p className="Request-alert" style={{ color: "red" }}>
                      &nbsp;Your Balance is Too Low
                    </p>
                  )}
                  {
                    <span
                      onClick={() => {
                        covePayment();
                      }}
                    >
                      <b>Confirm</b>
                    </span>
                  }
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Footer data={[customerDetails]} />
    </>
  );
};

export default CheckoutPage;
