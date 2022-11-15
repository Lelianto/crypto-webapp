/* eslint-disable array-callback-return */
import * as React from 'react';
import { IMarketContext, ILatestPrice } from '../@types/market';

export const MarketContext = React.createContext<IMarketContext | null>(null);

interface Props {
  children: React.ReactNode;
}

const MarketProvider: React.FC<Props> = ({ children }) => {
  const [priceList, setPriceList] = React.useState<ILatestPrice[]>([]);
  const savePriceList = (priceList: ILatestPrice[]) => {
		setPriceList(priceList);
	};
  return <MarketContext.Provider value={{ priceList, savePriceList }}>{children}</MarketContext.Provider>;
};

export default MarketProvider;