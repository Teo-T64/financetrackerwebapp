import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";

function Filter(){
    useUser();
    return(
        <Dashboard activeMenu="Filters">
            Filter page
        </Dashboard>       
    )
}

export default Filter;