import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { act, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";
import axios from "axios";

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

        const isDuplicate = categoryData.some((el)=>{return el.name.toLowerCase() === name.trim().toLowerCase();})
        if(isDuplicate){
            toast.error("Category already exists");
            return;
        }
        
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

    function handleEditCategory(category){
        setSelectedCategory(category);
        setOpenEditCategoryModal(true);
        
    }

    async function handleUpdateCategory(updatedCategory){
        const {id,name,type,icon} = updatedCategory;
        if(!name.trim()){
            toast.error("Category name required");
            return;
        }
        if(!id){
            toast.error("Missing category Id for updating");
            return;
        }

        try {
            await axiosConfig.put(API_ENDPOINTS.EDIT_CATEGORY(id),{name,type,icon});
            toast.success("Category successfully updated!");
            setOpenEditCategoryModal(false);
            fetchCategoryData();
            
            
        } catch (error) {
            console.log("Error updating category",error);
            toast.error(error?.message || "Failed to update category");
        }
    }

    return(
        <Dashboard activeMenu="Category">
            <div className="mx-auto my-5 ">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-2xl font-semibold">All Categories</h2>
                    <button 
                        onClick={()=>setOpenAddCategoryModal(true)}
                        className="add-btn cursor-pointer text-purple-700 font-extrabold bg-purple-100 p-4 rounded-md flex items-center gap-1">
                        Add Category  
                        <Plus size={20}/>
                    </button>

                </div>

                <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                <Modal title={"Add category"} isOpen={openAddCategoryModal} onClose={()=>setOpenAddCategoryModal(false)}>
                    <AddCategoryForm onAddCategory={handleAddCategory}/>

                </Modal>

                <Modal title={"Edit category"} isOpen={openEditCategoryModal} onClose={()=>{setOpenEditCategoryModal(false); setSelectedCategory(null);}}>
                    <AddCategoryForm initialCategoryData={selectedCategory} onAddCategory={handleUpdateCategory} isEditing={true}/>

                </Modal>


            </div>
        </Dashboard>       
    )
}

export default Category;