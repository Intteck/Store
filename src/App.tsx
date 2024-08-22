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


type ProductItem = {
  id: number;
  name: string;
  description: string;
  image_URL: string;
  product_Type: productType[];
  price: number;
};

type Details = {
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
  type CartItem = {
    id: number;
    count: number;
  };


type CategoryKey ="Refrigerators" | "Freezers" | "Air Conditioners" | "Washing Machines" | "Microwaves Oven" |"Small Home Appliances" |"Phones" |"Accessories"| "Laptops" | "Tvs" ;
 
function App() {
   const location = useLocation();
   const [cart, setCartItems] = useState<CartItem[]>([]);
   const [customerDetails, setCustomerDetails] = useState<Details>({
     id: 0,
     first_name: "",
     last_name: "",
     dob: new Date().toISOString(),
     email: "",
     phone_number: "",
     address: "",
     country: "",
     state: "",
     city: "",
   });

   useEffect(() => {
     window.scrollTo(0, 0);
   }, [location]);

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
           <Route path="/Login" element={<Login data={[setCustomerDetails]} />} />
           <Route path="/Account" element={<Account data={[customerDetails]}  />} />
           <Route path="/Profile" element={<Profile data={[customerDetails]} />} />
           <Route path="/About" element={<About data={[customerDetails]}  />} />
           <Route path="/Contact" element={<Contact data={[customerDetails]} />} />

           <Route
             path="/Home"
             element={
               <HomePage data={[customerDetails,Products, categoriesNames, isPending]} />
             }
           />
           <Route
             path="/Search"
             element={
               <CategoryPage data={[ customerDetails,Products, categoriesNames, isPending]} />
             }
           />
           <Route
             path="/Product/:id"
             element={
               <ProductPage data={[customerDetails,Products, isPending, cart, setCartItems]} />
             }
           />
           <Route
             path="/Product"
             element={
               <ProductPage data={[customerDetails,Products, isPending, cart, setCartItems]} />
             }
           />
           <Route
             path="/Cart"
             element={
               <CartPage data={[customerDetails,Products, isPending, cart, setCartItems]} />
             }
           />
           <Route path="/Checkout" element={<CheckoutPage data={[Products, isPending,customerDetails, cart, setCartItems]} />} />
           <Route
             path="/categories/:category"
             element={
               <CategoryPage data={[customerDetails,Products, categoriesNames, isPending]} />
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