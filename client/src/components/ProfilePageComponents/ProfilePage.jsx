import React, { useEffect, useState } from "react";
import './ProfilePage.css';
import { Link, useParams } from "react-router-dom";

const LandingPage =({checkLoginStatus})=>{
    const {profile}=useParams();
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        mail:"",
        country:"",
        signupDate:"",
        loginTime:""
    });
    const [mounted,setMounted]=useState(false);
    const [loggedIn,setLoggedIn]=useState(false);
    const [userFound,setUserFound]=useState(false);
    const [message,setMessage]=useState("Welcome");

    async function fetchUserInfo(profile){
        const res=await fetch(`http://localhost:5000/${profile}`,{
                    method:"GET",
                    headers:{ 'Content-Type': 'application/json' },
                    });
        const user=await res.json();
        if(user.data){
            setUserFound(true);
            setData({
                firstName:user.data.firstName,
                lastName:user.data.lastName,
                mail:user.data.mail,
                country:user.data.country,
                signupDate:user.data.signupDate
            })
        }
        setMounted(true);
    }

    async function getUserData(){
        let userData=await checkLoginStatus();
        if(userData.data && userData.data.mail==profile){
            setData(userData.data);
            setUserFound(true);
            setLoggedIn(userData.loggedIn);
            setMounted(true);
            
        }else{
            fetchUserInfo(profile);
            setMessage("User Profile")
        }
    }
    
    useEffect(()=>{
        getUserData();
    },[])
    
    useEffect(()=>{
        if(mounted&&!loggedIn&&userFound){
            const button=document.getElementsByClassName("logout-button-container")[0];
            button.style.display="none";
        } 
    },[mounted])

    if(!mounted){
        return(
            <div className="landing-page-container">
                loading...
            </div> 
        )
    }else if(!userFound){
        return(
            <div className="landing-page-container">
                profile not found!!!
            </div> 
        )
    }else{
        return(
            <div className="profile-page">
                <div className="logout-button-container">
                    <Link to="/" className="logout-button">Log out</Link>
                </div>
            
                <div className="landing-page-container">
                    
                    <div>{message}</div>
                    <div className="card-1">
                        <div>{data.firstName} {data.lastName}</div>
                    </div>
                    <div className="card-2">
                        <p>{data.mail}</p>
                    </div>
                    <div className="card-3">
                        <p>{data.country}</p>
                    </div>
                    <div className="card-4">
                        <p>profile created at {data.signupDate.slice(0,10)}</p>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default LandingPage;