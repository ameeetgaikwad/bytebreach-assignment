"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  clientEmail: string;
  setClientEmail: Dispatch<SetStateAction<string>>;
  auditorEmail: string;
  setAuditorEmail: Dispatch<SetStateAction<string>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  chain: number;
  setChain: Dispatch<SetStateAction<number>>;
}

export const GlobalContext = createContext<ContextProps>({
  clientEmail: "",
  setClientEmail: (): string => "",
  auditorEmail: "",
  setAuditorEmail: (): string => "",
  authenticated: false,
  setAuthenticated: (): boolean => true,
  chain: 0,
  setChain: (): number => 0,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [clientEmail, setClientEmail] = useState("");
  const [auditorEmail, setAuditorEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [chain, setChain] = useState(0);
  return (
    <GlobalContext.Provider
      value={{
        clientEmail,
        setClientEmail,
        auditorEmail,
        setAuditorEmail,
        authenticated,
        setAuthenticated,
        chain,
        setChain,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
