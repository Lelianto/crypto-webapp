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
	currencyGroup: ICurrencyGroup[];
	saveCurrencyGroup: (currencyGroup: ICurrencyGroup[]) => void;
}

export interface IMenu {
  text: string;
  icon: JSX.Element;
}
export interface ISliderMenu {
  menus: IMenu[];
}

export interface ITableHeader {
  text: string;
  style: string;
}

export interface ITable {
  headers: ITableHeader[];
  contents: ITableContent[];
}

export interface ITableContent {
  crypto: JSX.Element;
  price: JSX.Element;
  day: JSX.Element;
  week: JSX.Element;
  month: JSX.Element;
  year: JSX.Element;
}

export interface ISearchContent {
  crypto: JSX.Element
}
export interface ITopSection {
  setKeyword: (keyword: string) => void;
  setShowSearchResult: (show: boolean) => void;
  showSearchResult: boolean;
  searchContent: ISearchContent[];
}