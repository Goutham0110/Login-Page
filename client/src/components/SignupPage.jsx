import React, { useEffect, useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import Loading from "./Loading";

const SignupPage=()=>{
    const [name,setName] = useState("");
    const [mail,setMail] = useState("");
    const [setpassword,setSetpassword] = useState("");
    const [confirmpassword,setConfirmpassword]= useState("");
    const [mandate,setMandate]=useState("");
    const [submitEnabled,setsubmitEnabled]=useState(false);
    const [loading,setLoading]=useState(false);
    const navigate = useNavigate();

    const password= setpassword===confirmpassword?setpassword:null;
    const signupAPI="http://localhost:5000/signup";

    async function handleSubmit(e){
        e.preventDefault();
        if(!submitEnabled){
            return;
        }
        try{
            setLoading(true)
            const res=await fetch(signupAPI,{
                        method:"POST",
                        headers:{
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({
                            "name":name,
                            "mail":mail,
                            "password":password
                        })
                    })
            if(res.status===200){
                setLoading(false)
                navigate(`/login`);
                alert("User created successfully")
            }else if(res.status===400){
                setMandate("user already exists")
            }
            else{
                setMandate("Invalid Credentials")
            }
            setLoading(false)
        }catch(err){
            setLoading(false)
            setMandate("server down");
        }
    }

 

    useEffect(()=>{
        const element=document.getElementsByClassName("mandate")[0];
        if(!(/^[A-Za-z]*$/.test(name) || name==="")){
            setMandate("Name should contain only characters");
        }
        else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) || mail==="")){
            setMandate("Enter a valid Mail ID");
        }
        else if(!(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(setpassword) || setpassword==="")){
            setMandate("Password should contain atleast 8 letters, 1 symbol, 1 uppercase, 1 lowercase, 1 number");
        }
        else if(!(setpassword===confirmpassword || confirmpassword==="") && setpassword!==""){
            setMandate("Confirm password does not match New Password");
        }
        else if(!(mandate==="server down" || mandate==="user already exists" || mandate==="Invalid Credentials" )){
            setMandate(""); 
            setsubmitEnabled(true);            
        }
        mandate?element.style.display="block":element.style.display="none";

    },[name,mail,setpassword,confirmpassword,mandate])

    if(loading){
        return(
            <Loading/>
        )
    }
    return(
        <div className="signupPage">   
            <div className="signupPageContainer">  
                <div className="signupPageForm">   
                    <div className="signupPageHeader">
                        <p>Create an account</p>
                    </div>       

                    <form className="form" onSubmit={handleSubmit}>

                            <div className="container">
                                <input className="input" type="text" name="name" required=" " onChange={(e)=>setName(e.target.value)} />
                                <label className="label" >Name</label>
                            </div>

                            <div className="container">
                                <input className="input" type="text" name="mail" required=" " onChange={(e)=>setMail(e.target.value)}/>
                                <label className="label">Email</label>
                            </div>   

                            <div className="container">
                                <input className="input" type="password" name="setpassword" required=" "  onChange={(e)=>setSetpassword(e.target.value)}/>
                                <label className="label">New Password</label>
                            </div>

                            <div className="container">
                                <input className="input" type="password" name="confirmpassword" required=" " onChange={(e)=>setConfirmpassword(e.target.value)}/>
                                <label className="label">Confirm Password</label>
                            </div>

                            <div className="mandate">
                                <p>* {mandate}</p>
                            </div>

                            <div className="buttonContainer">
                                <input type="submit" className='button' value="Create Account"/>
                            </div>
                    </form>
                </div>
                    <div className="SignupPageFooter">
                        <p>Have an account? </p>
                        <NavLink className="nav" to="/login">Click here</NavLink>
                        <p> to Log In</p>
                    </div>
            
        </div>
    </div>
    )
}

export default SignupPage;