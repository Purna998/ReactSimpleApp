import api from "../api";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../../token";
import google from '../assests/google.png'

const AuthForm=({route,method})=>{
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("")
    const[error,setError]=useState("")
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const[success,setSuccess]=useState(null);
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try{
            const res=await api.post(route,{username,password});

            if(method==="login"){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                localStorage.setItem(REFRESH_TOKEN,res.data.refresh);
                navigate("/")
                window.location.reload();
            }else{
                setSuccess("Registration Successful, Please Login");
                setTimeout(()=>{
                    navigate("/login");
                },2000);
            }
            }catch(error){
                console.error(error);
                if(error.response ){
                    if(error.response.status===401){
                    setError("Invalid Credentials");
                    }
                    else if(error.response.status==400){
                        setError("Username already exists");
                    }
                    else{
                        setError("An error occurred, please try again later");
                    }    
                }else if(error.request){
                    setError("Network error, please check your connection");
                }else{
                    setError("An unexpected error occurred");
                } 
            }finally{
                setLoading(false);
            }
        };
    const handleGoogleLogin=()=>{
        window.location.href="https://localhost:8000/accounts/google/login"
    }

    return(
        <div className="form-container">
        {loading &&(
            <div className="loading-indicator">
                {error? <span className="error-message">{error}</span>:<div className="spinner"></div>}
            </div>
        )}
        (!loading &&(
            <form onSubmit={{handleSubmit}}>
                <h2>{method=='register'?'Register':'Login'}</h2>
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}
                
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    /></div>
                
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e)=>setUsername(e.target.value)}
                        required
                    /></div>

                    <button type="submit" className="form-button">
                        {method=="register"?'Register':'Login'}
                    </button>
                    <button type="button" className="google-button" onClick={handleGoogleLogin}>
                        <img src={google} alt="Google icon" className="google-icon" />
                        {method=='register'?'Register':'Login with Google'}
                    </button>
                    {method=="login" &&(
                        <p className="toggle-text">Don't have an account?
                        <span className="toggle-link" onClick={()=>navigate('/register')}>Login</span></p>
                    )}
                    {method=="register" &&(
                        <p className="toggle-text">Already have an account?
                        <span className="toggle-link" onClick={()=>setMethod('/login')}>Login</span></p>
                    )}

            </form>
        ))
        </div>
    )
    }
export default AuthForm;