import React, { useCallback, useEffect, useState } from "react";
import { ICurrencyGroup } from "../@types/market";
import { getSupportedCurrencies, getLatestPriceChange } from "../services/apis";
import Table from "../components/Tables";

export interface ITableContent {
  crypto: JSX.Element;
  price: JSX.Element;
  day: JSX.Element;
  week: JSX.Element;
  month: JSX.Element;
  year: JSX.Element;
}

const Home: React.FC = () => {
  const [currencyGroup, setCurrencyGroup] = useState<ICurrencyGroup[]>([]);
  const [tableContent, setTableContent] = useState<ITableContent[]>([]);
  const [filter, setFilter] = useState<string>("DAY");
  const headers = [
    {
      text: "CRYPTO",
      style: "pl-5 md:pl-20 pr-5 py-5 text-black md:text-gray1 font-bold",
    },
    {
      text: "HARGA",

      style: "py-5 text-gray1 font-bold",
    },
    {
      text: "24 JAM",
      style: "py-5 text-gray1 font-bold",
    },
    {
      text: "1 MGG",
      style: "py-5 text-gray1 font-bold",
    },
    {
      text: "1 BLN",
      style: "py-5 text-gray1 font-bold",
    },
    {
      text: "1 THN",
      style: "py-5 text-gray1 font-bold",
    },
  ];
  const getCurrencies = async () => {
    const response: ICurrencyGroup[] = (await getSupportedCurrencies()) ?? [];
    setCurrencyGroup(response);
  };
  const getSvg = async (url: string) => {
    const realUrl = url.replace(/\/+$/, "");
    return await fetch("https://shielded-hamlet-02892.herokuapp.com/" + realUrl)
      .then(async (res) => await res.text())
      .then((file) => file)
      .catch((error) => console.log({ error }));
  };
  const upDownConverter = (data: string) => {
    return (
      <>
        <div className="flex">
          <div className="flex flex-col justify-center">
            {data && Number(data) < 0 && <div className="arrow-down" />}
            {data && Number(data) >= 0 && <div className="arrow-up" />}
          </div>
          <div
            className={`flex-col justify-center font-bold ${
              Number(data) < 0 ? "text-down" : "text-up"
            }`}
          >
            {Number(data) < 0 ? `${-1 * Number(data)}` : data}
          </div>
        </div>
      </>
    );
  };
  const getPriceChange = useCallback(async () => {
    const response: ICurrencyGroup[] =
      (await getLatestPriceChange(currencyGroup)) ?? [];
    const promises: Promise<ITableContent>[] = response.map(
      async (content: ICurrencyGroup) => {
        const crypto = (
          <>
            <div className="flex p-5 pr-0 md:pr-5">
              <div className="flex flex-col justify-center">
                <div
                  className="crypto-logo"
                  dangerouslySetInnerHTML={{
                    __html:
                      (
                        (content?.logo &&
                          (await getSvg(content?.logo))) as string
                      )
                        .replaceAll("currentColor", `${content.color}`)
                        .replaceAll("24px", "32px") ?? "",
                  }}
                />
              </div>
              <div className="flex flex-col lg:flex-row justify-between lg:w-3/4">
                <div className="pl-6 flex flex-col justify-center font-bold">
                  {content.wallets?.[0]?.blockchain}
                </div>
                <div className="pl-6 lg:pl-0 flex flex-col justify-center text-gray1">
                  {content?.currencyGroup}
                </div>
              </div>
            </div>
          </>
        );
        const day: JSX.Element = <>{upDownConverter(content.day ?? "")}</>;
        const week: JSX.Element = <>{upDownConverter(content.week ?? "")}</>;
        const month: JSX.Element = <>{upDownConverter(content.month ?? "")}</>;
        const year: JSX.Element = <>{upDownConverter(content.year ?? "")}</>;
        const price: JSX.Element = (
          <>
            <div className="font-bold text-right md:text-left pr-5 md:pr-0">
              {content?.latestPrice}
            </div>
            <div className="md:hidden font-bold flex justify-end md:text-left pr-5 md:pr-0">
              <div className="flex ">
                {filter === "DAY" && day}
                {filter === "WEEK" && week}
                {filter === "MONTH" && month}
                {filter === "YEAR" && year}
              </div>
            </div>
          </>
        );

        return {
          crypto,
          price,
          day,
          week,
          month,
          year,
        };
      }
    );
    const tableContent: ITableContent[] = await Promise.all(promises);
    setTableContent(tableContent);
    setCurrencyGroup(response);
    // setTimeout(() => {
    // 	getPriceChange()
    // }, 10000)
  }, [currencyGroup, filter]);
  useEffect(() => {
    getCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (currencyGroup.length !== 0 && !currencyGroup?.[0]?.pair) {
      getPriceChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyGroup]);
  return (
    <>
      <div className="md:px-4 lg:px-8 xl:px-12">
        <Table headers={headers} contents={tableContent} />
      </div>
    </>
  );
};
export default Home;
