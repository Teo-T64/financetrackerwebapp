import { X } from "lucide-react";

function Modal({children, isOpen, onClose, title}){
    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/40 backdrop-blur-sm">
            <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
                <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100">
                    <div className="flex items-center justify-between p-5 md:p-6 rounded-t-xl">
                        <h3 className="text-xl font-semibold text-gray-800">
                            {title}
                        </h3>

                        <button onClick={onClose} type="button" className="text-gray-500 bg-gray-50 hover:bg-red-50 hover:text-red-500 rounded-lg text-sm w-9 h-9 inline-flex items-center justify-center transition-colors duration-100 cursor-pointer">
                            <X className="w-7 h-7"/>
                        </button>
                    </div>

                    <div className="p-5 md:p-6 text-gray-700">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal;