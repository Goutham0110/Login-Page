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
    const logoutAPI="http://localhost:5000/logout";

    async function getUserData(){
        let userData=await checkLoginStatus();
        if(userData.mail===profile){
            setLoggedIn(true);
            setMessage("Your Profile")
        }else{
            setMessage("User Profile")
        }
        const res=await fetch(`http://localhost:5000/profile/${profile}`,{
                    method:"GET",
                    headers:{ 'Content-Type': 'application/json' },
                    });
        const user=await res.json();
        if(user.data){
            setUserFound(true);
            setData({
                name:user.data.name,
                mail:user.data.mail,
                signupDate:user.data.signupDate
            })
        }
        setLoading(false);
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