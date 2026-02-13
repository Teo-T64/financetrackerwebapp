import { createContext, useState } from "react";

const AppContext = createContext();

export function AppContextProvider({children}){
    const [user,setUser] = useState(null);

    const contextValue = {
        user
    };

    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}