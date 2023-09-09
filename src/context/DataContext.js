import { createContext, useState } from "react";

// import { LOCALSTORAGE_KEYS, ROLES, PLAN_STATUS } from "@/utils/constants";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const getCartCountFromStore = JSON.parse(localStorage.getItem(
        "cartCount"
    ));

    console.log("getCartCountFromStore", getCartCountFromStore);

    const [data, setData] = useState(getCartCountFromStore);
    const [values, setValues] = useState({});


    return (
        <DataContext.Provider value={{ data, setData, values, setValues }}>
            {children}
        </DataContext.Provider>
    );
};

