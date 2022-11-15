import React, { useCallback, useEffect, useState } from "react";
import { ICurrencyGroup } from "../@types/market";
import { getSupportedCurrencies, getLatestPriceChange } from "../services/apis";
import Table from "../components/Tables";
import SliderMenu from "../components/Slider";

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
  const [searchContent, setSearchContent] = useState<{ crypto: JSX.Element }[]>(
    [{ crypto: <div></div> }]
  );
  const [keyword, setKeyword] = useState<string>("");
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [filter] = useState<string>("DAY");
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
  const getPriceChange = useCallback(
    async (keyword?: string) => {
      let response: ICurrencyGroup[] =
        (await getLatestPriceChange(currencyGroup)) ?? [];
      if (keyword) {
        response = response.filter((res) =>
          res.wallets?.[0]?.blockchain
            ?.toLowerCase()
            .includes(keyword.toLowerCase())
        );
        console.log(typeof keyword);
      }
      const searchPromise = response.map(async (content: ICurrencyGroup) => {
        const crypto = (
          <>
            <div
              onClick={() =>
                setKeyword(content?.wallets?.[0]?.blockchain ?? "")
              }
              className="flex p-2 pr-0 md:pr-5"
            >
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
                        .replaceAll(`="24"`, `="32"`)
                        .replaceAll("24px", "32px") ?? "",
                  }}
                />
              </div>
              <div className="flex flex-col lg:flex-row justify-between w-full">
                <div className="pl-2 flex flex-col justify-center font-bold">
                  {content.wallets?.[0]?.blockchain}
                </div>
                <div className="flex flex-col justify-center text-gray1">
                  {content?.currencyGroup}
                </div>
              </div>
            </div>
          </>
        );
        return { crypto };
      });
      const search = Promise.all(searchPromise);
      setSearchContent(await search);
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
                          .replaceAll(`="24"`, `="32"`)
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
          const month: JSX.Element = (
            <>{upDownConverter(content.month ?? "")}</>
          );
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
    },
    [currencyGroup, filter]
  );
  useEffect(() => {
    getCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (currencyGroup.length !== 0 && !currencyGroup?.[0]?.pair) {
      getPriceChange(keyword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyGroup]);
  useEffect(() => {
    console.log({ keyword });
    getCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  return (
    <>
      <div className="md:px-4 lg:px-8 xl:px-12 pt-4">
        <div className="flex justify-between">
          <div>Harga Crypto dalam Rupiah Hari Ini</div>
          <div>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="relative z-30 w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block bg-slate-200 relative z-20 px-4 py-2 pl-10 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-slate-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Cari Crypto Berdasarkan Nama"
                onChange={(e) => setKeyword(e.target.value)}
                onClick={() => setShowSearchResult(true)}
              />
              <button
                type="submit"
                onClick={() => setShowSearchResult(false)}
                className="text-black absolute z-30 right-1.5 bottom-1.5 bg-slate-200 font-medium rounded-lg text-sm px-2 py-1"
              >
                &#x2715;
              </button>
              {showSearchResult && (
                <div className="absolute z-10 rounded-lg top-0 bg-white w-full h-96 pt-10 overflow-y-scroll shadow-lg">
                  <div className="">
                    {searchContent.map((content) => {
                      return (
                        <>
                          <div className="cursor-pointer">{content.crypto}</div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4" />
        <SliderMenu />
        <div className="mb-4" />
        <Table headers={headers} contents={tableContent} />
      </div>
    </>
  );
};
export default Home;
