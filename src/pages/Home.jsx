import { Euro, HandCoins, WalletCardsIcon } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import useUser from "../hooks/useUser";
import {addCommas} from "../util/util.js"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import RecentTransactions from "../components/RecentTransactions.jsx";
import FinanceOverview from "../components/FinanceOverview.jsx";
import Transactions from "../components/Transactions.jsx";

function Home(){
    const [dashData, setDashData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useUser();

    async function fetchDashData(){
        if(loading) return;
        setLoading(true);
        try {
            const res = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if(res.status === 200){
                setDashData(res.data);
            }
            
        } catch (error) {
            console.log("Error to fetch dash data",error);
            toast.error(error.message || "Failed to fetch dash data");
        } finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchDashData();

        return(()=>{});
    },[])

    return(
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="my-5 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            icon={<WalletCardsIcon />}
                            label="Total Balance: "
                            value={addCommas(dashData?.totalBalance || 0)}
                            color="bg-purple-800"
                        />
                        <InfoCard
                            icon={<Euro />}
                            label="Total Income: "
                            value={addCommas(dashData?.totalIncome || 0)}
                            color="bg-green-700"
                        />                        
                        <InfoCard
                            icon={<HandCoins />}
                            label="Total Expenses: "
                            value={addCommas(dashData?.totalExpense || 0)}
                            color="bg-red-500"
                        />                        
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <RecentTransactions onMore={()=>navigate("/expense")} transactions={dashData?.recentTransactions}/>

                        <FinanceOverview 
                            totalBalance={dashData?.totalBalance || 0}
                            totalIncome={dashData?.totalIncome || 0}
                            totalExpense={dashData?.totalExpense || 0}
                        />

                        <Transactions
                            transactions={dashData?.recent5Expenses || []}
                            onMore={()=>navigate("/expense")}
                            type="expense"
                            title="Recent Expenses"
                        />
                        <Transactions
                            transactions={dashData?.recent5Incomes || []}
                            onMore={()=>navigate("/income")}
                            type="income"
                            title="Recent Income"
                        />                        
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Home;