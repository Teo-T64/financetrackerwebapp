import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal.jsx"
import { PlusCircle } from "lucide-react";

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

    function handleDelete(id){
        console.log(id);
        
    }

    useEffect(()=>{
        fetchIncomeDetails();
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
                        Income Form
                    </Modal>

                </div>
            </Dashboard>    
    )   
}

export default Income;