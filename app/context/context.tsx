"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  chain: number;
  setChain: Dispatch<SetStateAction<number>>;
}

export const GlobalContext = createContext<ContextProps>({
  userEmail: "",
  setUserEmail: (): string => "",
  loading: true,
  setLoading: (): boolean => true,
  chain: 0,
  setChain: (): number => 0,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState(0);
  return (
    <GlobalContext.Provider
      value={{
        userEmail,
        setUserEmail,
        loading,
        setLoading,
        chain,
        setChain,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
