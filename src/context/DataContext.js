import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const getCartCountFromStore = JSON.parse(localStorage.getItem(
        "cartCount"
    ));
    const [data, setData] = useState(getCartCountFromStore || null);

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

