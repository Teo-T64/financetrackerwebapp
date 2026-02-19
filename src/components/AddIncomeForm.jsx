import { useState } from "react";
import EmojiPopUp from "./EmojiPopUp.jsx";
import Input from "../components/Input.jsx"

function AddIncomeForm({categories, onAddIncome}){
    const [income,setIncome] = useState({
        name: "",
        date: "",
        icon: "",
        amount:0,
        categoryId:null,
    })

    const categoryOptions = categories.map((category)=>({
        value : category.id,
        label : category.name
    }));

    function handleChange(key,value){
        setIncome({...income,[key]:value})
    }

    return(
        <div>
            <EmojiPopUp icon={income.icon} onSelect={(selIcon)=>handleChange("icon",selIcon)}/>

            <Input 
                value={income.name}
                onChange={({target})=>handleChange("name",target.value)}
                label="Income Source"
                placeholder="e.g. Salary, Freelance, Bonus"
                type="text"
            />

            <Input
                label="Category"
                value={income.categoryId}
                onChange={({target})=>handleChange("categoryId",target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                label="Amount"
                value={income.amount}
                onChange={({target})=>handleChange("amount",target.value)}
                type="number"
                placeholder="e.g. 1000"
            />

            <Input
                value={income.date}
                onChange={({target})=>handleChange("date",target.value)}
                label="Date"
                type="date"

            />

            <div className="flex justify-end mt-5">
                <button type="button" onClick={()=>onAddIncome(income)} className="bg-purple-500 p-3 rounded-md font-semibold text-white cursor-pointer">
                    Add Income
                </button>
            </div>  

        </div>
    )
}

export default AddIncomeForm;