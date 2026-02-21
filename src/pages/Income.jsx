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

    async function handleDownload() {
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.DOWNLOAD_INCOMES, {
                responseType: 'blob', 
            });

            if (res.status === 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                
                const link = document.createElement('a');
                link.href = url;
                
                link.setAttribute('download', 'incomes.xlsx');
                
                document.body.appendChild(link);
                link.click();
                link.remove();
                
                window.URL.revokeObjectURL(url);
                
                toast.success("Download started!");
            }
        } catch (error) {
            console.error("Error downloading incomes", error);
            toast.error("Failed to download income report");
        }
    }

    async function handleEmail(){
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOMES);
            if (res.status === 200) {
                toast.success("Email sent successfully");
            }
        } catch (error) {
            console.error("Error emailing incomes", error);
            toast.error("Failed to email income report");
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
                            <IncomeOverview type="income"  transactions={incomeData} onAddIncome={()=>setOpenIncomeModal(true)}/>
                            
                        </div>

                    </div>

                    <IncomeList type="income" onEmail={handleEmail} onDownload={handleDownload} transactions={incomeData} onDelete={(id)=>setOpenDeleteAlert({show:true,data:id})}/>

                    <Modal 
                        isOpen={openIncomeModal}
                        onClose={()=>setOpenIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm type="income"  categories={categories} onAddIncome={handleAddIncome}/>
                    </Modal>

                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={()=>setOpenDeleteAlert({show:false,data:null})}
                        title="Delete income"
                    >
                        <DeleteAlert
                            type="income" 
                            content="Are you sure you want to delete this income detail?"
                            onDelete={()=>deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>

                </div>
            </Dashboard>    
    )   
}

export default Income;