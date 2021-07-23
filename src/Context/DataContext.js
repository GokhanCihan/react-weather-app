import { createContext, useContext } from "react";

const DataContext = createContext(); 

const DataProvider = ({children}) => {

    
    
    return(
        <DataContext.Provider value="" >
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => useContext(DataContext);

export default DataProvider;