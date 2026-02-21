import { ArrowRight } from "lucide-react";
import TransactionCard from "./TransactionCard";
import moment from "moment";


function Transactions({transactions, onMore, type, title}){

    return(
        <div className="relative flex flex-col my-6 bg-white border border-slate-200 rounded-lg w-full p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{title}</h5>
                <button className="flex items-center gap-2 bg-purple-500 p-3 rounded-md font-semibold text-white cursor-pointer" onClick={onMore}>
                    More <ArrowRight size={15}/>
                </button>
            </div>

            <div className="mt-6">
                {
                    transactions?.slice(0,5).map((item)=>(
                        <TransactionCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={type}
                            hideDeleteBtn={true}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Transactions;