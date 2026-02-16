import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";

function Category(){
    const [loading, setLoading] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useUser();

    async function fetchCategoryData(){
        if(loading) return;
        setLoading(true);

        try {
            const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(res.status === 200){
                console.log("fetched categories: ", res.data);
                setCategoryData(res.data);
            }
            

        } catch (error) {
            console.error("Error fetching categories",error);
            toast.error(error.message);
        }finally{
            setLoading(false);

        }
    }

    useEffect(()=>{
        fetchCategoryData();

    },[])

    return(
        <Dashboard activeMenu="Category">
            <div className="mx-auto my-5">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button className="add-btn cursor-pointer text-purple-700 font-extrabold bg-purple-200 p-4 rounded-md flex items-center gap-1">
                      Add Category  <Plus size={20}/>
                    </button>

                </div>

                <CategoryList categories={categoryData}/>


            </div>
        </Dashboard>       
    )
}

export default Category;