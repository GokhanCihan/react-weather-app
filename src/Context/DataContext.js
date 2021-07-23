import { createContext, useContext } from "react";

const DataContext = createContext(); 

const DataProvider = ({children}) => {

    /*  GET data from the API 
        Pass it into the value */
    
    return(
        <DataContext.Provider value="" >
            {children}
        </DataContext.Provider>
    )
};

export const useData = () => useContext(DataContext);

export default DataProvider;