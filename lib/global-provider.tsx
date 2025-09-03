import React, {  ReactNode, createContext, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./Appwrite";
// import from 'react';

interface User {
    $id: string;
    name : string;
    email: string;
    avatar: unknown
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading:  boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
    error: string | null;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

    const { data: user, loading, error, refetch } = useAppwrite({
        fn: getCurrentUser,
    })

    const isLoggedIn = !!user;
    // !null = true, !true = false, so !!null means false
    // !{ name: "Leonard"} = false, !false = true }

    // console.log(JSON.stringify(user, null, 2));

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            user: user as User | null,
            loading,
            refetch,
            error
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType  => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobaProvider");
    }

    return context
}

export default GlobalProvider