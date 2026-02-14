import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

function Input({label,value,onChange,placeholder,type}){
    const [showPassword,setShowPassword] = useState(false);

    function toggleShowPassword(){
        setShowPassword(!showPassword);
    }

    return(
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 block mb-1">
                {label}
            </label>
            <div className="relative">
                <input 
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 pr-10 leading-tight focus:outline-none focus:border-gray-900"
                    type={type === "password" ? (showPassword ? "text" : "password") : type} 
                    value={value} 
                    onChange={(e)=>onChange(e)} 
                    placeholder={placeholder} 
                />
                {type === "password" && (
                    <span className="absolute right-3 top-0.5 -translate-y-[-0.7vh] cursor-pointer ">
                        {showPassword ? <EyeIcon size={20} className="text-primary" onClick={toggleShowPassword}/> : <EyeClosedIcon size={20} className="text-primary" onClick={toggleShowPassword}/>}
                    </span>
                )}
            </div>
        </div>
    )
}

export default Input;