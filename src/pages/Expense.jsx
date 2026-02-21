import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/income-expense/IncomeList.jsx";
import Modal from "../components/Modal.jsx"
import AddIncomeForm from "../components/income-expense/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/income-expense/IncomeOverview.jsx";

function Expense(){
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openExpenseModal, setOpenExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null
    });

    useUser();

    async function fetchExpenseDetails(){
        if(loading) return;

        setLoading(true);
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.GET_EXPENSES);
            if(res.status === 200){
                setExpenseData(res.data);
            }
            
        } catch (error) {
            console.log("Error fetching expenses", error);
            toast.error(error?.message || "Failed to fetch expenses");
            
        }finally{
            setLoading(false);
        }
    }

    async function fetchExpenseCategories() {
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if(res.status === 200){
                setCategories(res.data);
            }
            
        } catch (error) {
            console.log("Error fetching expense categories",error);
            toast.error(error.message || "Failed to fetch expense categories");
            
        }

    }

    async function handleAddExpense(expense){
        const {name,date,icon, amount,categoryId} = expense;  
        
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
            const res = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE,{name,date,icon, amount,categoryId});
            if(res.status === 201){
                toast.success("Successfully added expense!");
                setOpenExpenseModal(false);
                fetchExpenseDetails();
            }
            
        } catch (error) {
            console.log("Error adding expense",error);
            toast.error(error.message || "Failed to add expense");
            
        }

    }

    async function deleteExpense(id){
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show:false,data:null});
            toast.success("Expense Deleted");
            fetchExpenseDetails();

        } catch (error) {
            console.log("Error deleting expense",error);
            toast.error(error.message || "Failed to delete expense");
            
        }
    }

    async function handleDownload() {
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.DOWNLOAD_EXPENSES, {
                responseType: 'blob', 
            });

            if (res.status === 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                
                const link = document.createElement('a');
                link.href = url;
                
                link.setAttribute('download', 'expenses.xlsx');
                
                document.body.appendChild(link);
                link.click();
                link.remove();
                
                window.URL.revokeObjectURL(url);
                
                toast.success("Download started!");
            }
        } catch (error) {
            console.error("Error downloading expenses", error);
            toast.error("Failed to download expense report");
        }
    }

    async function handleEmail(){
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSES);
            if (res.status === 200) {
                toast.success("Email sent successfully");
            }
        } catch (error) {
            console.error("Error emailing expenses", error);
            toast.error("Failed to email expense report");
        }
    }

    useEffect(()=>{
        fetchExpenseDetails();
        fetchExpenseCategories();
    },[])

    return(
            <Dashboard activeMenu="Expenses">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <IncomeOverview type="expense" transactions={expenseData} onAddIncome={()=>setOpenExpenseModal(true)}/>
                            
                        </div>

                    </div>

                    <IncomeList type="expense" onEmail={handleEmail} onDownload={handleDownload} transactions={expenseData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}/>

                    <Modal 
                        isOpen={openExpenseModal}
                        onClose={()=>setOpenExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddIncomeForm type="expense" categories={categories} onAddIncome={handleAddExpense}/>
                    </Modal>

                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                        title="Delete expense"
                    >
                        <DeleteAlert
                            type="expense" 
                            content="Are you sure you want to delete this expense detail?"
                            onDelete={()=>deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </Dashboard>    
    )   
}

export default Expense;