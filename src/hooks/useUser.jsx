import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
function useUser(){
    const {user, setUser, clearUser} = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(user){
            return;
        }

        let isMounted = true;
        
        async function fetchUserInfo(){
            try {
                const res =  await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);
                if(isMounted && res.data){
                    setUser(res.data);
                }

            } catch (error) {
                console.error("Failed to fetch user info",error);
                if(isMounted){
                    clearUser();
                    navigate("/home");
                }
                
            }
        }
        fetchUserInfo();
        return ()=>{
            isMounted = false;
        }
    },[setUser,clearUser,navigate])

}

export default useUser;