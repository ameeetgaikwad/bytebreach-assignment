"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  clientEmail: string;
  setClientEmail: Dispatch<SetStateAction<string>>;
  auditorEmail: string;
  setAuditorEmail: Dispatch<SetStateAction<string>>;
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const GlobalContext = createContext<ContextProps>({
  clientEmail: "",
  setClientEmail: (): string => "",
  auditorEmail: "",
  setAuditorEmail: (): string => "",
  authenticated: false,
  setAuthenticated: (): boolean => true,
  loading: false,
  setLoading: (): boolean => false,
});

export const GlobalContextProvider = ({ children }: any) => {
  const [clientEmail, setClientEmail] = useState("");
  const [auditorEmail, setAuditorEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <GlobalContext.Provider
      value={{
        clientEmail,
        setClientEmail,
        auditorEmail,
        setAuditorEmail,
        authenticated,
        setAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
