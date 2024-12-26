import React, { useEffect, useState } from "react";
import CategoryPage from "./components/CategoryPage";
import Startpage from "./components/Startpage";
import HomePage from "./components/HomePage";
import "./App.css";
import useFetch from "./useFetch";
import { BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import Profile from "./components/Profile";
import Account from "./components/Account";
import Login from "./components/Login";
import About from "./components/About";
import Contact from "./components/Contact";
import OrdersPage from "./components/OrdersPage";
import Term from "./components/Term";
import Cookies from "js-cookie";
import Wishlist from "./components/Wishlish";
import Recovery from "./components/Recovery";
import Membership from "./components/Membership";
import AdminSellerApplications from "./components/AdminSellerApplications";
import ProductUpload from "./components/ProductUpload";
import ProductRequests from "./components/ProductRequests";

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
  postalCode: string;
  phone_number: string;
  address: string;
  country: string;
  state: string;
  city: string;
  wallet_amt: number;
  wishlist: string[];
};

 
type productType = {
  id: number;
  name: string;
  description: string;
};
  type CartItem = {
    id: number;
    count: number;
  };


type CategoryKey ="Refrigerators" | "Freezers" | "Air Conditioners" | "Washing Machines" | "Microwaves Oven" |"Small Home Appliances" |"Phones" |"Accessories"| "Laptops" | "Tvs" ;
 
function App() {
   const location = useLocation();
   const [cart, setCartItems] = useState<CartItem[]>([]);
   const [inCheckout, setInCheckout] = useState(false);
   const [role, setRole] = useState("");
   const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
     id: 0,
     first_name: "",
     last_name: "",
     dob: "",
     email: "",
     phone_number: "",
     address: "",
     country: "",
     postalCode: "",
     state: "",
     city: "",
     wallet_amt: 0,
     wishlist : [''],

   });

   useEffect(() => {
     window.scrollTo(0, 0);
   }, [location]);

   useEffect(()=>{
   if (
     Cookies.get("customerDetails") !== undefined &&
     Cookies.get("customerRole") !== undefined
   ) {
     setCustomerDetails(JSON.parse(Cookies.get("customerDetails")!));
     setRole(JSON.parse(Cookies.get("customerRole")!));
   }
   },[])

  const {
    data: Products,
    isPending,
    //setData: setProduct,
  } = useFetch<ProductItem[]>("https://pretiosusapi.gibsonline.com/api/Products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  


 const categoriesNames: CategoryKey[] = [
   "Refrigerators",
   "Freezers",
   "Air Conditioners",
   "Washing Machines",
   "Microwaves Oven",
   "Small Home Appliances",
   "Phones",
   "Accessories",
   "Laptops",
   "Tvs"
 ];


 return (
   <>
     <div className="App">
       <div>
         <Routes>
           <Route path="/" element={<Startpage />} />
           <Route path="/Recovery" element={<Recovery />} />

           <Route
             path="/Login"
             element={
               <Login
                 data={[setCustomerDetails,setRole, setInCheckout, inCheckout]}
               />
             }
           />
           <Route
             path="/Account"
             element={<Account data={[customerDetails]} />}
           />
           <Route
             path="/Profile"
             element={
               <Profile
                 data={[customerDetails, Products, setCustomerDetails, role]}
               />
             }
           />
           <Route
             path="/Terms and Conditions"
             element={<Term data={[customerDetails, Products]} />}
           />
           <Route
             path="/About"
             element={<About data={[customerDetails, Products]} />}
           />
           <Route
             path="/Contact"
             element={<Contact data={[customerDetails, Products]} />}
           />
           
           <Route
             path="/AdminSellerApplications"
             element={<AdminSellerApplications  />}
           />
            <Route
             path="/ProductUpload"
             element={<ProductUpload  />}
           />
           
           <Route
             path="/ProductRequests"
             element={<ProductRequests  />}
           />
           <Route
             path="/Membership"
             element={<Membership data={[customerDetails, Products]} />}
           />
           <Route
             path="/Orders"
             element={<OrdersPage data={[customerDetails, Products]} />}
           />

           <Route
             path="/Orders/:orderId"
             element={<OrdersPage data={[customerDetails, Products]} />}
           />
           <Route
             path="/Wishlist"
             element={
               <Wishlist data={[customerDetails, Products, isPending]} />
             }
           />

           <Route
             path="/Home"
             element={
               <HomePage
                 data={[customerDetails, Products, categoriesNames, isPending]}
               />
             }
           />
           <Route
             path="/Search"
             element={
               <CategoryPage
                 data={[customerDetails, Products, categoriesNames, isPending]}
               />
             }
           />
           <Route
             path="/Product/:id"
             element={
               <ProductPage
                 data={[
                   customerDetails,
                   Products,
                   isPending,
                   cart,
                   setCartItems,
                   setCustomerDetails,
                 ]}
               />
             }
           />
           <Route
             path="/Product"
             element={
               <ProductPage
                 data={[
                   customerDetails,
                   Products,
                   isPending,
                   cart,
                   setCartItems,
                   setCustomerDetails,
                 ]}
               />
             }
           />
           <Route
             path="/Cart"
             element={
               <CartPage
                 data={[
                   customerDetails,
                   Products,
                   isPending,
                   cart,
                   setCartItems,
                   setInCheckout,
                   setCustomerDetails,
                 ]}
               />
             }
           />
           <Route
             path="/Checkout"
             element={
               <CheckoutPage
                 data={[
                   Products,
                   isPending,
                   customerDetails,
                   cart,
                   setCartItems,
                   setCustomerDetails,
                 ]}
               />
             }
           />
           <Route
             path="/categories/:category"
             element={
               <CategoryPage
                 data={[customerDetails, Products, categoriesNames, isPending]}
               />
             }
           />
         </Routes>
       </div>
     </div>
   </>
 );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;