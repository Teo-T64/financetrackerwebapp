import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu,UserIcon, X } from "lucide-react";
import { assets } from "../assets/assets";
import Sidebar from "./Sidebar";

function MenuBar({activeMenu}){
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropDownRef = useRef(null);
    const {user,clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(()=>{
        function handleClickOutside(e){
            if(dropDownRef.current && !dropDownRef.current.contains(e.target)){
                setShowDropdown(false);
            }
        }
        if(showDropdown){
            document.addEventListener("mousedown",handleClickOutside)
        }

        return ()=>{document.removeEventListener("mousedown", handleClickOutside)}
    },[showDropdown])

    function handleLogout(){
        localStorage.clear();
        clearUser();
        setShowDropdown(false);
        navigate("/login");
    }

    return(
        <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-30">
            
            <div className="flex items-center gap-5">
                <button onClick={()=>setOpenSideMenu(!openSideMenu)} className="block lg:hidden text-black hover:bg-gray-200 p-1 rounded transition-colors">
                    {openSideMenu ? (<X className="text-2xl "/>) : (<Menu className="text-2xl"/>)}
                </button>
            </div>

            <div className="flex items-center gap-2">
                <img src={assets.logo} alt="logo" className="h-22 w-42"/>
            </div>

            <div className="relative" ref={dropDownRef}>
                <button onClick={()=>setShowDropdown(!showDropdown)} className="flex items-center justify-center h-10 w-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2">
                    <UserIcon className="text-purple-800"/>
                </button>
                {
                    showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            <div className="px-4 py-3 border-b border-gray-200 ">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center h-8 w-8 bg-gray-100 rounded-full">
                                        <UserIcon className="w-4 h-4 text-purple-700"/>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-md text-gray-800 truncate">
                                            {/*user.fullName*/}
                                            Name
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {/*user.email*/}
                                            Email
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="py-1">
                                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                                    <LogOut className="w-4 h-4 text-gray-500"/> 
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>

            {
                openSideMenu && (
                    <div className="fixed left-0 right-0  border-b border-gray-200 lg:hidden z-20 top-30">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>
                )
            }

        </div>
    )
}

export default MenuBar;