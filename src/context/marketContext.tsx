/* eslint-disable array-callback-return */
import { FC, useState, ReactNode, createContext } from "react";
import { IMarketContext, ICurrencyGroup } from "../@types/market";

export const MarketContext = createContext<IMarketContext | null>(null);

interface Props {
  children: ReactNode;
}

const MarketProvider: FC<Props> = ({ children }) => {
  const [currencyGroup, setCurrencyGroup] = useState<ICurrencyGroup[]>([]);
  const saveCurrencyGroup = (currencyGroup: ICurrencyGroup[]) => {
    setCurrencyGroup(currencyGroup);
  };
  return (
    <MarketContext.Provider value={{ currencyGroup, saveCurrencyGroup }}>
      {children}
    </MarketContext.Provider>
  );
};

export default MarketProvider;
