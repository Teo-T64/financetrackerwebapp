import { ArrowRight } from "lucide-react";
import TransactionCard from "../components/TransactionCard.jsx"
import moment from "moment";

function RecentTransactions({transactions, onMore}){


    return(
        <div className="relative flex flex-col my-6 bg-white border border-slate-200 rounded-lg w-full p-4">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">
                    Recent Transactions
                </h5>
                <button onClick={onMore} className="flex items-center gap-2 bg-purple-500 p-3 rounded-md font-semibold text-white cursor-pointer">
                    More <ArrowRight size={15}/>
                </button>
            </div>

            <div className="mt-6">
                {
                    transactions?.slice(0,5)?.map((item)=>(
                        <TransactionCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn={true}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default RecentTransactions;