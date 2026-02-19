import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal.jsx"
import { PlusCircle } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm.jsx";

function Income(){
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openIncomeModal, setOpenIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    useUser();

    async function fetchIncomeDetails(){
        if(loading) return;

        setLoading(true);
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.GET_INCOMES);
            if(res.status === 200){
                setIncomeData(res.data);
            }
            
        } catch (error) {
            console.log("Error fetching incomes", error);
            toast.error(error?.message || "Failed to fetch incomes");
            
        }finally{
            setLoading(false);
        }
    }

    async function fetchIncomeCategories() {
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if(res.status === 200){
                setCategories(res.data);
            }
            
        } catch (error) {
            console.log("Error fetching income categories",error);
            toast.error(error.message || "Failed to fetch income categories");
            
        }

    }

    async function handleAddIncome(income){
        const {name,date,icon, amount,categoryId} = income;  
        
        if(!name.trim()){
            toast.error("Name is required");
            return;
        }
        if(!amount || isNaN(amount) || Number(amount)<=0){
            toast.error("Invalid amount");
            return;
        }        
        if(!date){
            toast.error("Date is required");
            return;
        }

        const today = new Date().toISOString().split("T")[0];
        if(date > today){
            toast.error("Invalid Date");
            return;
        }
        if(!categoryId){
            toast.error("Category is required");
            return;
        }

        try {
            const res = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME,{name,date,icon, amount,categoryId});
            if(res.status === 201){
                toast.success("Successfully added income!");
                setOpenIncomeModal(false);
                fetchIncomeDetails();
            }
            
        } catch (error) {
            console.log("Error adding income",error);
            toast.error(error.message || "Failed to add income");
            
        }

    }

    function handleDelete(id){
        console.log(id);
        
    }

    useEffect(()=>{
        fetchIncomeDetails();
        fetchIncomeCategories();
    },[])

    return(
            <Dashboard activeMenu="Income">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <button onClick={()=>setOpenIncomeModal(true)} className="flex items-center gap-2 cursor-pointer bg-purple-700 text-white font-semibold p-2 rounded-md">
                                <PlusCircle size={25}/> Add Income   
                            </button>
                        </div>

                    </div>

                    <IncomeList transactions={incomeData} onDelete={handleDelete}/>

                    <Modal 
                        isOpen={openIncomeModal}
                        onClose={()=>setOpenIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm categories={categories} onAddIncome={handleAddIncome}/>
                    </Modal>

                </div>
            </Dashboard>    
    )   
}

export default Income;