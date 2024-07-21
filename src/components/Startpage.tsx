import React from "react";
import "./Startpage.css";
import { Link } from "react-router-dom";

const Startpage = () => {
    return (
      <>
        <div className="startPage">
          <div>
            <img src="src\assets\IMG-20240516-WA0011 1.svg" alt="" />
            <p className="startText">Beautiful eCommerce UI Kit for your online store</p>
            <Link to={"/Shop"} className="btn">Let's get started</Link>
          </div>
        </div>
      </>
    );
}
 
export default Startpage;