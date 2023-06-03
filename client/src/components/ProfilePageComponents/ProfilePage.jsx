import React, { useEffect, useState } from "react";
import './ProfilePage.css';
import { Link, useParams } from "react-router-dom";

const LandingPage =({loggedIn,setLoggedIn})=>{
    const {profile}=useParams();
    const [fetchStatus,setFetchStatus]=useState(false);
    const [FirstName,setFirstName]=useState("first name is not available");
    const [LastName,setLastName]=useState("");
    const [mail,setMail]=useState("not available");
    const [country,setCountry]=useState("not available");
    const [signupDate,setSignupDate]=useState("not available");
    const [mounted,setMounted]=useState(false);
    const [message,setMessage]=useState();

    async function fetchUserInfo(profile){
        const res=await fetch(`http://localhost:5000/${profile}`,{
                    method:"GET",
                    headers:{ 'Content-Type': 'application/json' },
                    });
        const user=await res.json();
        if(user.data){
            setFetchStatus(true);
            user.data.firstName?setFirstName(user.data.firstName):setFirstName("unavailable");
            user.data.lastName?setLastName(user.data.lastName):setLastName("unavailable");
            user.data.mail?setMail(user.data.mail):setMail("unavailable");
            user.data.country?setCountry(user.data.country):setCountry("unavailable");
            user.data.signupDate?setSignupDate(user.data.signupDate):setSignupDate("unavailable");
        }
        setMounted(true);
    }
    
    useEffect(()=>{
        fetchUserInfo(profile);
        loggedIn?setMessage("Welcome,"):setMessage("User Profile")
        if(mounted){
            const button=document.getElementsByClassName("logout-button-container")[0];
            if(!loggedIn){
                button.style.display="none";
            }
        } 
    },[mounted])

    if(!mounted){
        return(
            <div className="landing-page-container">
                loading...
            </div> 
        )
    }else if(mounted && fetchStatus){
        return(
            <div className="profile-page">
                <div className="logout-button-container">
                    <Link to="/" className="logout-button">Log out</Link>
                </div>
            
                <div className="landing-page-container">
                    
                    <div>{message}</div>
                    <div className="card-1">
                        <div>{FirstName} {LastName}</div>
                    </div>
                    <div className="card-2">
                        <p>{mail}</p>
                    </div>
                    <div className="card-3">
                        <p>{country}</p>
                    </div>
                    <div className="card-4">
                        <p>profile created at {signupDate.slice(0,10)}</p>
                    </div>
                    
                </div>
            </div>
        )
    }else{
        return(
            <div className="landing-page-container">
                profile not found!!!
            </div> 
        )
    }
}

export default LandingPage;