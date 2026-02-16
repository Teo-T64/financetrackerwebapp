import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";

function Category(){
    useUser();
    return(
        <Dashboard activeMenu="Category">
            Category page
        </Dashboard>       
    )
}

export default Category;