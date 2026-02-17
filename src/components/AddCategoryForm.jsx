import { useState } from "react";
import Input from "../components/Input.jsx"
import EmojiPopUp from "./EmojiPopUp.jsx";
import { LoaderCircle } from "lucide-react";

function AddCategoryForm({onAddCategory}){
    const [category, setCategory] = useState({
        name:"",
        type:"income",
        icon:"",
    });
    const [loading,setLoading] = useState(false);

    const categoryOptions = [
        {value: "income", label: "Income"},
        {value: "expense", label: "Expense"}
    ]

    function handleChange(key,value){
        setCategory({...category,[key]:value})
    }

    async function handleSubmit(){
        setLoading(true);
        try{
            await onAddCategory(category);
        }finally{
            setLoading(false);
        }
    }

    return(
        <div className="p-4">
            <EmojiPopUp icon={category.icon} onSelect={(selIcon)=>handleChange("icon",selIcon)}/>

            <Input 
                value={category.name}
                onChange={({target})=>handleChange("name",target.value)}
                label="Category Name: "
                placeholder="e.g. Car, Rent, Bonus"
                type="text"
            />

            <Input
                label="Category Type: "
                value={category.type}
                onChange={({target})=>handleChange("type",target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <div className="flex justify-end mt-5">
                <button type="button" disabled={loading} onClick={handleSubmit} className="bg-purple-500 p-3 rounded-md font-semibold text-white cursor-pointer">
                    {loading ? (
                        <> 
                            <LoaderCircle className="animate-spin w-5 h-5"/>
                            Adding Category...
                        </>
                        ) : ("Add Category")
                    }                
                </button>
            </div>
        </div>
    )
}

export default AddCategoryForm;