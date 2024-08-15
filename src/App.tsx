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


type ProductItem = {
  id: number;
  name: string;
  description: string;
  image_URL: string;
  product_Type: productType[];
  price: number;
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
           <Route path="/Login" element={<Login />} />
           <Route path="/Account" element={<Account />} />
           <Route path="/Profile" element={<Profile />} />
           <Route
             path="/Home"
             element={<HomePage data={[Products, categoriesNames , isPending]} />}
           />
           <Route
             path="/Search"
             element={<CategoryPage data={[Products, categoriesNames,isPending]} />}
           />
           <Route
             path="/Product/:id"
             element={<ProductPage data={[Products, isPending,cart,setCartItems]} />}
           />
           <Route
             path="/Product"
             element={<ProductPage data={[Products, isPending,cart,setCartItems]} />}
           />
           <Route
             path="/Cart"
             element={<CartPage data={[Products,isPending,cart,setCartItems]} />}
           />
           <Route path="/Checkout" element={<CheckoutPage />} />
           <Route
             path="/categories/:category"
             element={<CategoryPage data={[Products, categoriesNames,isPending]} />}
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