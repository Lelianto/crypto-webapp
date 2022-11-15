import { ICurrencyGroup, ILatestPrice } from "../@types/market";
import { latestPriceApi, supportedCurrenciesUrl } from "./constants";

export const getSupportedCurrencies = async () => {
	try {
		const response = await fetch(supportedCurrenciesUrl);
		const json = await response.json();
		if (json?.payload.length !== 0) {
			const notIncludeIdr: ICurrencyGroup[] = json.payload.filter(
				(item: ICurrencyGroup) => item.currencyGroup !== 'IDR'
			);
			return notIncludeIdr
		}
		return []
	} catch (error) {
		console.error(error);
	}
};

export const getLatestPriceChange = async (currencyGroup: ICurrencyGroup[]) => {
	try {
		const response = await fetch(latestPriceApi);
		const json = await response.json();
		if (json?.payload.length !== 0) {
			const currencyData = [...currencyGroup];
			const updatedData: ICurrencyGroup[] = currencyData.map((group) => {
				const name: string = group?.currencyGroup?.toLowerCase() ?? '';
				const data = json.payload.filter((item: ILatestPrice) => item?.pair?.includes(name));
				if (data.length !== 0) {
					const { pair, latestPrice, day, week, month, year } = data[0];
					group.pair = pair;
					group.latestPrice = latestPrice ? `Rp ${latestPrice
						?.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`: '-';
					group.price = latestPrice;
					group.day = day;
					group.week = week;
					group.month = month;
					group.year = year;
				}
				return group;
			});
			return updatedData;
		}
		return []
	} catch (error) {
		console.error(error);
	}
};