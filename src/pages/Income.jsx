import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/income/IncomeList.jsx";
import Modal from "../components/Modal.jsx"
import { PlusCircle } from "lucide-react";
import AddIncomeForm from "../components/income/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/income/IncomeOverview.jsx";

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

    async function deleteIncome(id){
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show:false,data:null});
            toast.success("Income Deleted");
            fetchIncomeDetails();

        } catch (error) {
            console.log("Error deleting income",error);
            toast.error(error.message || "Failed to delete income");
            
        }

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
                            <IncomeOverview transactions={incomeData}/>
                            
                        </div>

                    </div>

                    <IncomeList transactions={incomeData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}/>

                    <Modal 
                        isOpen={openIncomeModal}
                        onClose={()=>setOpenIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm categories={categories} onAddIncome={handleAddIncome}/>
                    </Modal>

                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                        title="Delete income"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this income detail?"
                            onDelete={()=>deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </Dashboard>    
    )   
}

export default Income;