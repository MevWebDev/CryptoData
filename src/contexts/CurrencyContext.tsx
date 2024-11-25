import React, { createContext, useContext, useState, ReactNode } from "react";

interface CurrencyContextType {
  currency: { name: string; symbol: string };
  setCurrency: React.Dispatch<
    React.SetStateAction<{ name: string; symbol: string }>
  >;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState({ name: "usd", symbol: "$" });

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

/* eslint-disable-next-line react-refresh/only-export-components */
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
