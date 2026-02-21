import { addCommas } from "../util/util";
import CustomPieChart from "./CustomPieChart";

function FinanceOverview({totalBalance, totalIncome, totalExpense}){
    const COLORS = ["purple","green","red"];
    const balanceData = [
        {name: "Total Balance", amount : totalBalance},
        {name: "Total Income", amount : totalIncome},
        {name: "Total Expense", amount : totalExpense},

    ]

    return(
        <div className="relative flex flex-col my-6 bg-white border border-slate-200 rounded-lg w-full p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>
            <CustomPieChart
                data= {balanceData}
                label= "Total Balance"
                totalAmount = {`€${addCommas(totalBalance)}`}
                colors = {COLORS}
                showTextAnchor = {true}
            />
        </div>
    )
}

export default FinanceOverview;