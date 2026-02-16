import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";

function Income(){
    useUser();
    return(
            <Dashboard activeMenu="Income">
                Income page
            </Dashboard>    
    )   
}

export default Income;