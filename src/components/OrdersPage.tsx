import React from "react";
import useFetch from "../useFetch";
import "./OrdersPage.css"
import Nav from "./Nav";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
interface Props {
  data: [
    customerDetails: CustomerDetails,
    Products: ProductItem[] | null];
 }

type OrderItem = {
  id: number;
  customer: CustomerDetails[];
  product: ProductItem[];
  orderDate: string;
  orderTotal: number;
  status: string;
  trans_id: number;
  payment: [];
  fop: number;
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




const OrdersPage = (props: Props) => {
              const { data } = props;
              const [customerDetails, Products] = data;
    const formatter = new Intl.NumberFormat("en-US");

  const {
    data: Orders,
    isPending,
    //setData: setProduct,
  } = useFetch<OrderItem[]>(
    "https://pretiosusapi.gibsonline.com/api/Orders/Customer/"+customerDetails.id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { orderId } = useParams();
  console.log(orderId);
  
  if (orderId === undefined)
    return (
      <>
        <Nav data={[customerDetails, Products]} />
        <div className="content">
          {
            <div className="ordersContainer">
              <h2>
                Orders (
                {Orders?.reduce(
                  (count, item) => count + item.product.length,
                  0
                )}
                )
              </h2>
              {Orders &&
                Orders.map((order, index) => (
                  <>
                    {order.product.map((orderProduct) => (
                      <div
                        className="orderItem"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay={index * 100}
                      >
                        <img
                          src={
                            "https://pretiosusadmin.gibsonline.com/Product_Images/" +
                            orderProduct.image_URL
                          }
                          alt=""
                        />
                        <div className="orderItem-info">
                          <div>
                            <div>
                              <span className="orderItem-name">
                                {orderProduct.name}
                              </span>
                              <Link
                                className="seeDetail-btn"
                                to={`/Orders/${order.id}${order.trans_id}`}
                              >
                                See Details
                              </Link>
                            </div>
                            <span className="orderItem-refer">
                              Order {order.id}
                              {order.trans_id}
                            </span>
                            <span className="orderItem-date">
                              Placed on{" "}
                              {new Date(order.orderDate).toLocaleString()}
                            </span>
                          </div>
                          <span>{order.status}</span>
                        </div>
                      </div>
                    ))}
                  </>
                ))}
            </div>
          }
          <div className="mobile-section-container">
            {isPending && (
              <div className="Loader" id="Loader">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
          </div>
        </div>
        <Footer data={[customerDetails]} />
      </>
    );
    if(Orders){
    var [selectedOrder] = Orders.filter((order)=>{return (order.id+""+order.trans_id) === orderId});
    }

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

          {Orders && (
            <div className="ordersContainer">
              <h2>
                <Link to={"/Orders"}>
                  <img src="\src\assets\left-Arrow.png" alt="" />
                </Link>{" "}
                Orders Details
              </h2>
              <span>Order no. {orderId}</span>
              <span>{selectedOrder.product.length} Items</span>
              <span>
                Placed on {new Date(selectedOrder.orderDate).toLocaleString()}
              </span>
              <span>
                Total: &#8358;
                {formatter.format(Number(selectedOrder.orderTotal))}
              </span>
              <br />
              <span>
                <b>ITEMS IN THIS ORDER</b>
              </span>
              {selectedOrder.product.map((orderProduct, index) => (
                <div
                  className="orderItem"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  data-aos-delay={index * 100}
                >
                  <img
                    src={
                      "https://pretiosusadmin.gibsonline.com/Product_Images/" +
                      orderProduct.image_URL
                    }
                    alt=""
                  />
                  <div className="orderItem-info">
                    <div>
                      <div>
                        <span className="orderItem-name">
                          {orderProduct.name}
                        </span>
                        <Link
                          to={`/Product/${orderProduct.id}`}
                          className="seeDetail-btn"
                        >
                          Buy Again
                        </Link>
                      </div>
                      <span className="orderItem-refer">
                        QTY:{" "}
                        {
                          selectedOrder.product.filter(
                            (item) => orderProduct.id === item.id
                          ).length
                        }
                      </span>
                      <span className="orderItem-date">
                        &#8358;{formatter.format(Number(orderProduct.price))}
                      </span>
                    </div>
                    <span>{selectedOrder.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Footer data={[customerDetails]} />
      </>
    );

};
 
export default OrdersPage;