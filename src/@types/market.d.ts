interface ICurrency {
  currencyGroup?: string;
  decimal_point?: number;
  logo?: string;
  listingDate?: string;
}
export interface ILatestPrice {
  pair?: string;
  latestPrice?: string;
  price?: number;
  day?: string;
  week?: string;
  month?: string;
  year?: string;
}
export interface IWallet extends ICurrency {
  tokenSymbol?: string;
  tokenType?: string;
  blockchain?: string;
  explorer?: string;
  blockchainName?: string;
}
export interface ICurrencyGroup extends ICurrency, ILatestPrice {
  currencySymbol?: string;
  name?: string;
  color?: string;
  wallets?: IWallet[];
}
export interface IMarketContext {
	priceList: ILatestPrice[];
	savePriceList: (priceList: ILatestPrice[]) => void;
}