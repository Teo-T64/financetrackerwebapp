import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

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

    async function handleAddCategory(category){
        const {name,type,icon} = category;
        
        if(!name.trim()){
            toast.error("Category name required");
            return;
        }
        try {
            const res = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY,{name,type,icon});
            if(res.status === 201){
                toast.success("Category added successfully!");
                setOpenAddCategoryModal(false);
                fetchCategoryData();
            }
        } catch (error) {
            console.error("Error adding category",error);
            toast.error(error?.message || "Failed to add category" );
            
        }
    }

    return(
        <Dashboard activeMenu="Category">
            <div className="mx-auto my-5">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button 
                        onClick={()=>setOpenAddCategoryModal(true)}
                        className="add-btn cursor-pointer text-purple-700 font-extrabold bg-purple-200 p-4 rounded-md flex items-center gap-1">
                        Add Category  
                        <Plus size={20}/>
                    </button>

                </div>

                <CategoryList categories={categoryData}/>

                <Modal title={"Add category"} isOpen={openAddCategoryModal} onClose={()=>setOpenAddCategoryModal(false)}>
                    <AddCategoryForm onAddCategory={handleAddCategory}/>

                </Modal>


            </div>
        </Dashboard>       
    )
}

export default Category;