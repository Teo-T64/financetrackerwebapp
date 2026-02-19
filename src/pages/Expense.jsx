import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";

function Expense(){
    useUser();
    return(
        <Dashboard activeMenu="Expenses">
            Expense page
        </Dashboard>       
    )
}

export default Expense;