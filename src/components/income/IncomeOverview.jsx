import { useEffect, useState } from "react";
import CustomLineChart from "../CustomLineChart.jsx";
import { prepareIncomeChartData } from "../../util/incomeChartData";

function IncomeOverview({transactions}){
    const [chartData,setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareIncomeChartData(transactions);
        setChartData(result);  

    },[transactions])

    return(
        <div className="relative flex flex-col my-6 bg-white border border-slate-200 rounded-lg w-full p-4">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0 5">
                        Track your earnings over time and analyze your income
                    </p>
                </div>

            </div>

            <div className="h-75 w-full mt-10">
                <CustomLineChart transactions={chartData}/>
            </div>            
        </div>
    )
}

export default IncomeOverview;