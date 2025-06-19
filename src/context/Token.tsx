import React, { createContext, useContext, useState, useEffect } from "react";

type TokenContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  clearToken: () => void;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = useState<string | null>(() =>
    localStorage.getItem("aolfcmToken")
  );

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("aolfcmToken", newToken);
    } else {
      localStorage.removeItem("aolfcmToken");
    }
    setTokenState(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("aolfcmToken");
    setTokenState(null);
  };

  return (
    <TokenContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};
