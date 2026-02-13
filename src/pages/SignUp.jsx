import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

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
                            {/* Input component */ }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp;