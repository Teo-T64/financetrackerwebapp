import { Search } from "lucide-react";
import Dashboard from "../components/Dashboard";
import useUser from "../hooks/useUser";
import { useState } from "react";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import TransactionCard from "../components/TransactionCard.jsx"
import { API_ENDPOINTS } from "../util/apiEndpoints";
import moment from "moment";

function Filter(){
    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    useUser();

    async function handleSearch(e){
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS,{type,startDate,endDate,keyword,sortField,sortOrder});
            const data = res.data;
            const result = data.map((item)=>({...item,"type":type}));
            setTransactions(result);
            

        } catch (error) {
            console.log("Error filtering",error);
            toast.error("Failed to filter");
        }finally{
            setLoading(false);
        }        
    }


    return(
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Filter Transactions</h2>
                </div>
                <div className="relative flex flex-col my-6 bg-white border border-slate-200 rounded-lg w-full p-4 mb-4">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Select Filters</h5>
                    </div>
                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium mb-1">Type</label>
                            <select value={type} id="type" className="w-full border rounded px-3 py-2" onChange={(e)=>setType(e.target.value)}>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>

                            </select>
                        </div>

                        <div>
                            <label htmlFor="startdate" className="block text-sm font-medium mb-1">Start Date</label>
                            <input value={startDate} onChange={(e)=>setStartDate(e.target.value)} id="startdate" type="date" className="w-full border rounded px-3 py-2 focus:outline-purple-500"/>
                        </div>

                        <div>
                            <label htmlFor="enddate" className="block text-sm font-medium mb-1">End Date</label>
                            <input value={endDate} onChange={(e)=>setEndDate(e.target.value)} id="enddate" type="date" className="w-full border rounded px-3 py-2 focus:outline-purple-500"/>
                        </div>

                        <div>
                            <label htmlFor="sortorder" className="block text-sm font-medium mb-1">Sort Order</label>
                            <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)} id="sortorder" className="w-full border rounded px-3 py-2">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>

                            </select>                        
                        </div>

                        <div>
                            <label htmlFor="type" className="block text-sm font-medium mb-1">Sort Field</label>
                            <select value={sortField} id="type" className="w-full border rounded px-3 py-2" onChange={(e)=>setSortField(e.target.value)}>
                                <option value="date">Date</option>
                                <option value="amount">Amount</option> 
                            </select>
                        </div>

                        <div className="sm:cols-span-1 md:col-span-1 flex items-end">
                            <div className="w-full">
                                <label htmlFor="keyword" className="block text-sm font-medium mb-1">Search</label>
                                <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} id="keyword" type="text" placeholder="Search" className="w-full border rounded px-3 py-2 focus:outline-purple-500" />
                            </div>

                            <button onClick={handleSearch} className="ml-2 mb-0.5 p-2 bg-purple-700 hover:bg-purple-600 text-white rounded flex items-center justify-center cursor-pointer">
                                <Search size={23}/>
                            </button>

                        </div>

                    </form>
                </div>

                <div className="relative flex flex-col my-6 bg-white border border-slate-200 rounded-lg w-full p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-2xl font-semibold">Search Results</h5>
                    </div>                    
                    {
                        transactions.length === 0 && !loading ? (
                            <p className="text-gray-500">No data to display. Select the filters and click the icon to view the data</p>
                        ) : ("")
                    }
                    {
                        loading ? (
                            <p className="text-gray-500">Loading Transactions...</p>
                        ) : ("")
                    }
                    {
                        transactions.map((transaction)=>(
                            <TransactionCard
                                key={transaction.id}
                                title={transaction.name}
                                icon={transaction.icon}
                                date={moment(transaction.date).format("Do MMM YYYY")}
                                amount={transaction.amount}
                                type={transaction.type}
                                hideDeleteBtn={true}
                            />
                        ))
                    }
                </div>

            </div>
        </Dashboard>       
    )
}

export default Filter;