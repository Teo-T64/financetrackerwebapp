import { useEffect, useState } from "react";
import CustomLineChart from "../CustomLineChart.jsx";
import { prepareIncomeChartData } from "../../util/incomeChartData.js";
import { PlusCircle } from "lucide-react";

function IncomeOverview({transactions, onAddIncome,type}){
    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareIncomeChartData(transactions);
        setChartData(result);  

    },[transactions])

    return(
        <div className="relative flex flex-col my-6 bg-white border border-slate-200 rounded-lg w-full p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">{type == "income" ? "Income" : "Expense"} Overview</h5>
                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your earnings over time and analyze your {type == "income" ? "income" : "expenses"}
                    </p>
                </div>
                <button onClick={onAddIncome} className="flex items-center gap-2 cursor-pointer bg-purple-700 text-white font-semibold p-2 rounded-md">
                    <PlusCircle size={25}/> Add {type == "income" ? "Income" : "Expense"} 
                </button>
            </div>

            <div className="h-75 w-full mt-10">
                <CustomLineChart transactions={chartData}/>
            </div>            
        </div>
    )
}

export default IncomeOverview;