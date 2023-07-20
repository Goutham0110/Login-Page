import React, { useEffect, useState } from "react";
import Loading from "./Loading";

import './styles.css';
import { useParams, useNavigate } from "react-router-dom";



const ProfilePage =({checkLoginStatus})=>{
    const {profile}=useParams();
    const navigate = useNavigate();
    const [data,setData]=useState({
        name:"",
        mail:"",
        signupDate:"",
    });
    const [loading,setLoading]=useState(true);
    const [loggedIn,setLoggedIn]=useState(false);
    const [userFound,setUserFound]=useState();
    const [message,setMessage]=useState("");
    const logoutAPI=process.env.REACT_APP_LOGOUT_API;
    const getProfileAPI=process.env.REACT_APP_GET_PROFILE_API;
   


    async function getUserData(){
        
    }

    useEffect(()=>{
        getUserData();
    })
    
    useEffect(()=>{
        if(!loggedIn&&userFound){
            const button=document.getElementsByClassName("logoutButtonContainer")[0];
            button.style.display="none";
        } 
    },[loggedIn,userFound,message])

    async function handleLogout(){
        await fetch(logoutAPI,{
                    credentials: "include",
                    method:"POST",
                    headers:{ 'Content-Type': 'application/json' },
                    });
        navigate('/login')
    }

    if(loading){
        return(
            <Loading/>
        )
    }

    if(!userFound){
        return(
                <div className="profileNotFound">
                    Profile not Found!
                </div>
        )
    }
        return(
            <div className="profilePage">
                <div className="logoutButtonContainer">
                    <button onClick={handleLogout} className="logout-button">Log out</button>
                </div>
            
                <div className="profilePageContainer">
                    <div className="profilePageHeader">
                        <p>{message}</p>
                    </div>

                    <div className="card-1">
                        <div>{data.name}</div>
                    </div>
                    <div className="card-2">
                        <p>{data.mail}</p>
                    </div>
                    <div className="card-3">
                        <p>profile created at {data.signupDate.slice(0,10)}</p>
                    </div>

                </div>
            </div>
        )
}

export default ProfilePage;