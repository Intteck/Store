import React from "react";
import Footer from "./Footer";
import "./Profile.css"
interface Props {
  data: [customerDetails: CustomerDetails];
}

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
  city: string;
};

const Profile =(props:Props)=>{
         const { data } = props;
         const [customerDetails] = data;
    
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
<Footer data={[customerDetails]} />
</>

    );
};

export default Profile;
5