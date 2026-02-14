import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import Input from "../components/Input";

function SignUp(){
    const [email,setEmail] = useState("");
    const [fullName,setFullName] = useState("");
    const [password,setPassword] = useState("");
    const [errors,setErrors] = useState("");

    const navigate = useNavigate();

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-contain filter"/>
            <div className="relative z-10 w-full max-w-lg px-5">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create an Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your financial habits today!
                    </p>
                    <form onSubmit={null} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            {/* Pfp */}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                            <Input 
                                value={fullName}
                                onChange={(e)=>setFullName(e.target.value)}
                                label="Full name"
                                placeholder="Enter full name"
                                type="text"
                            />
                            <Input 
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                label="E-mail"
                                placeholder="Enter e-mail"
                                type="text"
                            />
                            <div className="col-span-2">
                                <Input 
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    label="Password"
                                    placeholder="Enter password"
                                    type="password"
                                />   
                            </div>
                       
                        </div>
                        {errors && (
                            <p className="text-red-800 text-sm text-center">
                                {errors}
                            </p>
                        )}
                        <button className="btn-primary bg-purple-700 text text-white w-full py-3 text-lg font-md rounded-md hover:bg-purple-800" type="submit">Sign Up</button>
                        <p className="text-slate-800 text-sm text-center mt-6">Already have an account? <Link to="/login" className="font-md text-primary underline hover:text-primary-dark transition-colors">Login</Link> </p>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default SignUp;