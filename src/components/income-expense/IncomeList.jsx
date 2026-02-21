import { Download, Mail } from "lucide-react";
import TransactionCard from "../TransactionCard.jsx";
import moment from "moment";
import { useState } from "react";

function IncomeList({transactions,onDelete,onDownload,onEmail ,type}){
    const [loading,setLoading] = useState(false);

    async function handleDownload(){
        setLoading(true);
        try {
            await onDownload();

        }finally{
            setLoading(false);
        }
    }

    async function handleEmail(){
        setLoading(true);
        try{
            await onEmail();
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="relative flex flex-col my-6 bg-white border p-6 border-slate-200 rounded-lg w-full">
            <div className="flex items-center justify-between">
                <h5 className="text-2xl font-semibold">
                  {type == "income" ? "Income" : "Expense"} Sources
                </h5>

                <div className="flex items-center justify-end gap-2">
                    <button onClick={handleEmail} disabled={loading} className="flex  items-center justify-center gap-2 bg-purple-100 font-semibold text-purple-700 p-2 rounded-md cursor-pointer">
                        <Mail size={20} className="text-base"/> Email
                    </button>
                    <button onClick={handleDownload} disabled={loading} className="flex items-center justify-center gap-2 bg-purple-100 font-semibold text-purple-700 p-2 rounded-md cursor-pointer">
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
                        type={type}
                        onDelete={()=>onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;