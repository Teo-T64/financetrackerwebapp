import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";

function Expense(){
    useUser();
    return(
        <Dashboard activeMenu="Expense">
            Expense page
        </Dashboard>       
    )
}

export default Expense;