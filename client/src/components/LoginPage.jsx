import Loading from "./Loading";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import './styles.css';


const LoginPage =()=>{

    const [mailid,setMailid]=useState();
    const [password,setPassword]=useState();
    const [mandate,setMandate]=useState("");
    const [loading, setLoading]=useState(false);
    const navigate = useNavigate();
    const loginAPI=process.env.REACT_APP_LOGIN_API;

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setLoading(true)
            const res=await fetch(loginAPI,{
                        method:"POST",
                        credentials: "include",
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            "mail":mailid,
                            "password":password
                        })
                    })
            const resJson= await res.json();
            setLoading(false)
            if(res.status===200){
                navigate(`/profile/${profile}`);                                      
            }else if(res.status===404){
                setMandate(resJson.message);
                return;
            }
        }catch(err){
            setLoading(false)
            console.log(err);
            setMandate("server down");
        }
    }

    if(loading){
        return(
            <>
                <Loading/>
            </>
        )
    }

    return(
        
        <div className="LoginPage">
            <div className="LoginPageContainer">
                <div className="LoginPageForm"> 
                    <div className="LoginPageHeader">
                        <p>Log In</p>
                    </div>

                    <form className="form" onSubmit={handleSubmit}>
                        <div className="container">
                            <input className="input" type="text" name="mailid" required=" " onChange={(e)=>setMailid(e.target.value)} autoFocus/>
                            <label className="label">Mail</label>
                        </div>    

                        <div className="container">
                            <input className="input" type="password" name="password" required=" " onChange={(e)=>setPassword(e.target.value)}/>
                            <label className="label">Password</label>
                        </div>
                        
                        {mandate&&                            
                            <div className="mandate">
                                <p>* {mandate}</p>
                            </div>
                        }

                        <div className="buttonContainer">
                            <input className="button" type="submit" value="Log In"/>
                        </div>
                    </form>
                </div>    

                <div className="LoginPageFooter">
                        <p>New here? </p>
                        <NavLink className="nav" to="/signup" end>Click here</NavLink>
                        <p> to create an acocunt</p>
                </div>
            </div>
        </div>
    
    )
}

export default LoginPage;