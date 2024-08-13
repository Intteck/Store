import React from "react";
import "./Startpage.css";
import { Link } from "react-router-dom";

const Startpage = () => {
    return (
      <>
        <div className="startPage">
          <div>
            <img src="src\assets\Pretiosus 1.png" alt="" />
            <p className="startText">SuperCharge your online shopping </p>
            <Link to={"/Home"} className="btn">
              Let's get started
            </Link>
          </div>
        </div>
      </>
    );
}
 
export default Startpage;