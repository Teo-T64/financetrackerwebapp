import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { UserCircle2Icon } from "lucide-react";
import { SIDEBAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";


function Sidebar({activeMenu}){
    const {user} = useContext(AppContext);
    const navigate = useNavigate();

    return(
        <div className="w-64 h-[calc(100vh-61px)] bg-white border border-gray-200/50 p-5 sticky top-15.25 z-20">
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                <UserCircle2Icon className="w-15 h-15 text-xl text-purple-800"/>
                <h5 className="text-gray-950 font-medium leading-6">
                    {/*user.fullName*/} Name
                </h5>
            </div>
            {SIDEBAR_DATA.map((item,idx)=>(
                <button 
                    onClick={()=>navigate(item.path)}
                    key={`menu_${idx}`} 
                    className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${activeMenu === item.label ? "text-white bg-purple-700" : ""}`}
                >
                    <item.icon className="text-xl"/>
                    {item.label}
                </button>
            ))}
        </div>
    )
}

export default Sidebar;