import React from "react";
import "./Login.css"

const Login =()=>{
 
    
    return(
<>
<div className="content">
<h1 className="text4">Login</h1>
<div className="formContainer">
        <form action="/submit-form" method="post">
        <div className="form-group">
                <input type="text" id="formInput" name="email"  placeholder="Email" required />
                </div>
                <div className="form-group">
                <input type="password" id="formInput" name="password"placeholder="Password" required />
                </div>
                
            
            <div className="formBtn">
                <button id="doneBtn" type="submit"><h2 className="text3">Login</h2></button>
            </div>
        </form>
    </div>
</div>
</>

    );
};

export default Login;
5