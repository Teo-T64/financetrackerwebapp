import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import { Home, LoaderCircle } from "lucide-react";
function Login(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errors,setErrors] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const{setUser} = useContext(AppContext);
    const navigate = useNavigate();

    async function handleOnSubmit(e){
        e.preventDefault();
        setIsLoading(true);
        if(!validateEmail(email)){
            setErrors("Please enter valid e-mail");
            setIsLoading(false);
            return;
        }
        if(!password.trim()){
            setErrors("Please enter your password");
            setIsLoading(false);
            return;
        }     
        setErrors("");  

        try {
            const res = await axiosConfig.post(API_ENDPOINTS.LOGIN,{email,password});
            const {token,user} = res.data;
            if(token){
                localStorage.setItem("token",token);
                setUser(user);
                navigate("/dashboard");
            }


        } catch (error) {
            if(error.response && error.response.data.message){
                setErrors(error.response.data.message);

            }else{
                console.error("Something went wrong.",error);
                setErrors(error.message);
            }
            
        } finally{
            setIsLoading(false);
        }
    }

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <div>
                <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-contain filter"/>

                <button onClick={()=>navigate("/home")} className="absolute top-5 right-5 flex items-center gap-2 cursor-pointer text-white font-bold bg-purple-700 px-6 py-2 rounded-full hover:bg-purple-800 transition-all shadow-md hover:shadow-lg">
                    Home<Home size={25}/>
                </button>
            </div>
            <div className="relative z-10 w-full max-w-lg px-5">
                    <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-semibold text-black text-center mb-2">
                            Welcome back
                        </h3>
                        <p className="text-sm text-slate-700 text-center mb-8">
                            Start tracking your financial habits today!
                        </p>
                        <form onSubmit={handleOnSubmit} className="space-y-4">
                            <Input 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                label="E-mail"
                                placeholder="Enter e-mail"
                                type="email"
                            />
                            <Input 
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                label="Password"
                                placeholder="Enter password"
                                type="password"
                            />   

                            {errors && (
                                <p className="text-red-800 text-sm text-center">
                                    {errors}
                                </p>
                            )}
                        <button disabled={isLoading} className={`btn-primary bg-purple-700 text text-white w-full py-3 text-lg font-md rounded-md hover:bg-purple-800 flex items-center justify-center gap-2 ${isLoading ?  "opacity-60 cursor-not-allowed" : ""}`} type="submit">
                            {isLoading ? (
                                <> 
                                    <LoaderCircle className="animate-spin w-5 h-5"/>
                                    Logging in...
                                </>
                            ) : ("Login")
                            }
                        </button>                            
                        <p className="text-slate-800 text-sm text-center mt-6">Dont't have an account? <Link to="/signup" className="font-md text-primary underline hover:text-primary-dark transition-colors">Sign Up</Link> </p>
                        </form>

                    </div>
                </div>
            </div>    
        )

}

export default Login;