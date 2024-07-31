import React from "react";
import Footer from "./Footer";
import "./Profile.css"

const Profile =()=>{
 
    
    return(
<>
<div className="content">
 <h2 className="Text5">Hello, Romani!</h2>
 <div className="profileContainer">
 <h2 className="text6">Announcement</h2>
 <h2 className="Text7">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas hendrerit luctus libero ac vulputate.</h2>
 </div>
 <h2 className="Text8">Check Your History &darr;</h2>
 <button id="doneHistory" ><h2 className="text3">History</h2></button>
</div>
<Footer />
</>

    );
};

export default Profile;
5