import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import "./CartPage.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Cookies from "js-cookie";

interface cartProps {
  data: [
    customerDetails: CustomerDetails,
    Products: ProductItem[] | null,
    isPending: boolean,
    cart: CartItem[],
    setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>,
    setInCheckout: React.Dispatch<React.SetStateAction<boolean>>,
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
  email: string;
  phone_number: string;
  address: string;
  postalCode: string;
  country: string;
  state: string;
  city: string;
  wallet_amt: number;
  wishlist: string[];
};

const CartPage = (props: cartProps) => {
  const { data } = props;
  const [
    customerDetails,
    Products,
    isPending,
    cart,
    setCartItems,
    setInCheckout,
    setCustomerDetails
  ] = data;
 const [wishlist, setWishlist] = useState(['']);
 const [selectedItem, setSelectedItem] = useState(0);
  const formatter = new Intl.NumberFormat("en-US");
  if (Products) {
    Total = Number(
      Products!
        .filter((item) => {
          return cart.some((obj) => obj.id === item.id);
        })
        .reduce(
          (sum, item) =>
            sum + cart.find((tem) => tem.id === item.id)?.count! * item.price,
          0
        )
    );
  } else {
    var Total = 0;
  }

  const today = new Date();

  // Correct format options with valid types
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long", // 'long', 'short', or 'narrow'
    year: "numeric", // 'numeric' or '2-digit'
    month: "long", // 'long', 'short', 'narrow', 'numeric', or '2-digit'
    day: "numeric", // 'numeric' or '2-digit'
  };

  // Format date
  const formattedDate = today.toLocaleDateString("en-US", options);

  const [daysAhead, setDaysAhead] = useState(1); // Default to 1 day ahead

  const futureDate = new Date();
  futureDate.setDate(today.getDate() + daysAhead); // Add 'daysAhead' to the current date

  // Format the future date
  const formattedFutureDate = futureDate.toLocaleDateString("en-US", options);

  const [installno, setInstallno] = useState(0);
  const buttons = Array.from({ length: installno }, (_, i) => (i + 1) * 2);

  const [installPrice, setInstallPrice] = useState("");
  const [installType, setinstallType] = useState([""]);
  const [selectedInstall, setSelectedInstall] = useState(0);

  const [installmentInfo, setInstallmentInfo] = useState(false);

  useEffect(() => {
      if (customerDetails.id === 0) {
        if (Cookies.get("cartItems") !== undefined) {
          const savedCartItems = JSON.parse(Cookies.get("cartItems")!);
          setCartItems(savedCartItems);
          console.log(savedCartItems);
        }
      } else {
        if (
          Cookies.get("cartItems") !== undefined &&
          Cookies.get("cartItems" + customerDetails.id) !== undefined
        ) {
          const customerCartItems = JSON.parse(
            Cookies.get("cartItems" + customerDetails.id)!
          );
          const generalCartItems = JSON.parse(Cookies.get("cartItems")!);
          const savedCartItems = customerCartItems.concat(generalCartItems);
          setCartItems(savedCartItems);

  Cookies.set("cartItems" + customerDetails.id, JSON.stringify(savedCartItems), {
    expires: 30,
  });
      Cookies.remove("cartItems");

        } else if (Cookies.get("cartItems") !== undefined) {
          const customerCartItems = JSON.parse(
            Cookies.get("cartItems")!
          );
          setCartItems(customerCartItems);
        } else if (Cookies.get("cartItems" + customerDetails.id) !== undefined) {
          const customerCartItems = JSON.parse(
            Cookies.get("cartItems" + customerDetails.id)!
          );
          setCartItems(customerCartItems);
        }
      }
      setWishlist(customerDetails.wishlist);
      
  },[Products]);


  const removeFromCart = (id: number) => {
    const updatedCartItems = cart.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
            setSelectedItem(0);
    if (customerDetails.id !== 0){
      Cookies.set(
        "cartItems" + customerDetails.id,
        JSON.stringify(updatedCartItems),
        { expires: 30 }
      );
    }
      
    else{
      Cookies.set("cartItems", JSON.stringify(updatedCartItems), {
        expires: 30,
      });
      console.log(updatedCartItems);
      
    }
  };

  const addToWishlist = (id: any) => {
  let updatedBody = [''];
    if (!customerDetails.wishlist.includes(String(id))) {
      updatedBody = [...customerDetails.wishlist, String(id)];
    } else {
      updatedBody = customerDetails.wishlist.filter((wish) => {
        return wish !== String(id);
      });
    }
    setWishlist(updatedBody);
    console.log("proccess sdtarted");
    fetch(
      "https://pretiosusapi.gibsonline.com/api/Customers/" + customerDetails.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...customerDetails,
          wishlist: updatedBody,
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
            wishlist: updatedBody,
          }),
          {
            expires: 7,
          }
        );
        setCustomerDetails({
          ...customerDetails,
          wishlist: updatedBody,
        });

        console.log("Data has been sent", data);
      })
      .catch((error) => {
        console.error("Error sending info:", error);
      });
  };


  return (
    <>
      <Nav data={[customerDetails, Products]} />
      <div className="content">
        <div className="mobile-section-container">
          {isPending && (
            <div className="Loader" id="Loader">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>

        {Products && (
          <div className="cartPage-container">
            <div className="cart-details">
              <span className="cart-details-header">&nbsp;</span>
              <span className="cart-details-header">Product</span>
              <span className="cart-details-header">Price</span>
              <span className="cart-details-header col4">Quantity</span>
              <span className="cart-details-header">Subtotal</span>
              <span className="cart-details-header">&nbsp;</span>
              <span className="cart-details-header">&nbsp;</span>
              {Products!
                .filter((item) => {
                  return cart.some((obj) => obj.id === item.id);
                })
                .map((item) => (
                  <>
                    <div className="cart-item-icon">
                      <img
                        src={
                          "https://pretiosusadmin.gibsonline.com/Product_Images/" +
                          item.image_URL
                        }
                        alt=""
                      />
                    </div>
                    <span>{item.name}</span>
                    <span>&#8358;{formatter.format(Number(item.price))}</span>
                    <span className="col4">
                      <span className="cart-item-count">
                        {cart.find((tem) => tem.id === item.id)?.count}
                      </span>
                    </span>
                    <span>
                      &#8358;
                      {formatter.format(
                        Number(
                          cart.find((tem) => tem.id === item.id)?.count! *
                            item.price
                        )
                      )}
                    </span>
                    <img
                      src="\src\assets\Vector.png"
                      alt=""
                      className="delete-icon"
                      onClick={() => {
                        setSelectedItem(item.id);
                      }}
                    />
                    <img
                      src={
                        wishlist.includes(String(item.id))
                          ? "/src/assets/Path 337.png"
                          : "/src/assets/heartlikw.png"
                      }
                      className="heartBtn-s"
                      onClick={() => {
                        addToWishlist(item.id);
                        removeFromCart(item.id);

                      }}
                      alt=""
                    />
                  </>
                ))}
            </div>
            <div className="cart-totals-container">
              <h2>Cart Totals</h2>
              <div>
                {Products!
                  .filter((item) => {
                    return cart.some((obj) => obj.id === item.id);
                  })
                  .map((item) => (
                    <div className="cart-subtotal">
                      <span>Subtotal</span>
                      <span>
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

                <div className="cart-subtotal">
                  <span>Total</span>
                  <span className="cart-total">
                    &#8358;
                    {formatter.format(Total)}
                  </span>
                </div>
              </div>
              <div className="cart-total-buttons">
                {customerDetails.email ? (
                  <button
                    onClick={() => {
                      if(cart[0])
                      setInstallmentInfo(!installmentInfo);
                      else
                      setInstallmentInfo(installmentInfo);

                    }}
                  >
                    Installment
                  </button>
                ) : (
                  <Link
                    to={"/Login"}
                    onClick={() => {
                      setInCheckout(true);
                    }}
                  >
                    <button>Installment</button>
                  </Link>
                )}

                {customerDetails.email ? (
                  <Link to={cart[0] ? "/Checkout" : "/Cart"}>
                    <button>Check Out</button>
                  </Link>
                ) : (
                  <Link
                    to={"/Login"}
                    onClick={() => {
                      setInCheckout(true);
                    }}
                  >
                    <button>Check Out</button>
                  </Link>
                )}
              </div>
              {!cart[0] && <span>Cart is Empty</span>}
            </div>
          </div>
        )}
        {selectedItem !== 0 && (
          <>
            <div
              className="blur"
              onClick={() => {
                setSelectedItem(0);
              }}
            ></div>
            <div className="moneyBox-container">
              <p>
                <img
                  className="cancel-sign"
                  src="\src\assets\close_24dp__FILL0_wght400_GRAD0_opsz24.png"
                  alt=""
                  onClick={() => {
                    setSelectedItem(0);
                  }}
                />
              </p>
              <h3>Are you sure you want to remove this Item?</h3>
              <div className="deletePopup">
                {!wishlist.includes(String(selectedItem)) && (
                  <button
                    onClick={() => {
                      addToWishlist(selectedItem);
                       removeFromCart(selectedItem);
                    }}
                  >
                    <img src="/src/assets/Path 337.png" alt="" />
                    Add to Wishlist
                  </button>
                )}
                <button
                  onClick={() => {
                    removeFromCart(selectedItem);
                  }}
                >
                  <img src="\src\assets\Vector.png" alt="" />
                  Remove Item
                </button>
              </div>
            </div>
          </>
        )}
        {installmentInfo && (
          <>
            <div
              className="blur"
              onClick={() => {
                setInstallmentInfo(!installmentInfo);
              }}
            ></div>
            <div className="installment-info">
              <p>Select Payment Method</p>
              <div className="installoptions">
                <button
                  onClick={() => {
                    setInstallno(20);
                    setinstallType(["Weekly", "Weeks"]);
                  }}
                >
                  Weekly
                </button>
                <button
                  onClick={() => {
                    setInstallno(6);
                    setinstallType(["Monthly", "Months"]);
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => {
                    setInstallno(0);
                    setinstallType(["Daily", "Day"]);
                  }}
                >
                  Once
                </button>
              </div>
              <p>Select the number installments</p>
              <div className="installno">
                {buttons.length > 0 ? (
                  buttons.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInstallPrice(
                          formatter.format(Math.floor(Total / item))
                        );
                        setSelectedInstall(item);
                        if (installType[0] === "Weekly") {
                          setDaysAhead(item * 7);
                        } else if (installType[0] === "Monthly") {
                          setDaysAhead(item * 30);
                        } else if (installType[0] === "Daily") {
                          setDaysAhead(1);
                        }
                      }}
                    >
                      {item}
                    </button>
                  ))
                ) : (
                  <button
                    onClick={() => {
                      setInstallPrice(formatter.format(Total));
                      setSelectedInstall(1);
                    }}
                  >
                    1
                  </button>
                )}
              </div>
              <p>Include Insurance?</p>
              <div className="installoptions">
                <button>Yes</button>
                <button>No</button>
              </div>
              {installPrice && installPrice && selectedInstall && (
                <div className="install-summary">
                  You Will be paying &#8358;{installPrice} {installType[0]} For{" "}
                  {selectedInstall} consecutives {installType[1]}. You can
                  receive your item(s) at the mid point of your installment
                  period between {formattedDate} and {formattedFutureDate}
                </div>
              )}
              <Link to={"/Checkout"}>
                <button>Proceed</button>
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer data={[customerDetails]} />
    </>
  );
};

export default CartPage;
