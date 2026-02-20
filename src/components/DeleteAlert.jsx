import { LoaderCircle } from "lucide-react";
import { useState } from "react";

function DeleteAlert({content, onDelete}){
    const [loading, setLoading] = useState(false);

    async function handleDelete(){
        setLoading(true);
        try{
            await onDelete();

        }finally{
            setLoading(false);
        }
    }

    return(
        <div>
            <p className="text-sm">
                {content}
            </p>
            <div className="flex justify-end mt-6">
                <button onClick={handleDelete} disabled={loading} type="button" className=" flex flex-row items-center  bg-purple-500 p-3 rounded-md font-semibold text-white cursor-pointer">
                    {loading ? (
                        <> 
                            Deleting...
                            <LoaderCircle className="animate-spin w-5 h-5"/>
                        </>
                        ) : ("Delete")
                    }                        
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;