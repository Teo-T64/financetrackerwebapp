import { Download, Mail } from "lucide-react";
import TransactionCard from "../TransactionCard.jsx";
import moment from "moment";

function IncomeList({transactions,onDelete}){


    return(
        <div className="relative flex flex-col my-6 bg-white border p-6 border-slate-200 rounded-lg w-full">
            <div className="flex items-center justify-between">
                <h5 className="text-2xl font-semibold">
                    Income Sources
                </h5>

                <div className="flex items-center justify-end gap-2">
                    <button className="flex  items-center justify-center gap-2 bg-purple-100 font-semibold text-purple-700 p-2 rounded-md cursor-pointer">
                        <Mail size={20} className="text-base"/> Email
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-purple-100 font-semibold text-purple-700 p-2 rounded-md cursor-pointer">
                        <Download size={20} className="text-base"/> Download
                    </button>                    
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((income)=>(
                    <TransactionCard 
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format("Do MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete={()=>onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;