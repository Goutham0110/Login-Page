import React, { useEffect } from "react";
import './LoginPage.css';
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";


const LoginPage =()=>{

    const [mailid,setMailid]=useState();
    const [password,setPassword]=useState();
    const [mandate,setMandate]=useState("");
    const navigate = useNavigate();
    const loginAPI="http://localhost:5000/login";

    async function handleSubmit(e){
        e.preventDefault();
        const res=await fetch(loginAPI,{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "mail":mailid,
                        "password":password
                    })
                })
        const resJson= await res.json();
        if(res.status===200){
            navigate(`/${mailid}`);
        }else if(res.status===404){
            setMandate(resJson.message);
            return;
        }else{
            setMandate("server Error")
        }
    }

    useEffect(()=>{
        const element=document.getElementsByClassName("mandate")[0];
        mandate?element.style.display="block":element.style.display="none";
    },[mandate])

    return(
        
        <div className="login-page">
            <div className="login-form">
                <p>Log In</p>
                <form onSubmit={handleSubmit}>

                    <div className="form-element">
                        <input type="text" placeholder="mail id" name="mailid" onChange={(e)=>setMailid(e.target.value)} autoFocus/>
                    </div>

                    <div className="form-element">
                        <input type="password" placeholder="password" name="password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    
                    <div className="mandate">
                        <p>* {mandate}</p>
                    </div>

                    <div className="login">
                        <input type="submit" name="submit"/>
                    </div>
                </form>
                
            </div>
            <div className="signup">
                <div className="sign-up">
                    <p>New here? </p>
                    <NavLink className="nav" to="signup">Click here</NavLink>
                    <p> to create an acocunt</p>
                </div>
            </div>
        </div>
    
    )
}

export default LoginPage;