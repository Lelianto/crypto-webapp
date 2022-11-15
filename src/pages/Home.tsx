import React, { useCallback, useEffect, useState } from "react";
import { ICurrencyGroup } from "../@types/market";
import { getSupportedCurrencies, getLatestPriceChange } from "../services/apis";
import { ImLibrary } from "react-icons/im";
import { HiOutlineSparkles } from "react-icons/hi2";
import { IoGameControllerOutline } from "react-icons/io5";
import {
  BsFileBarGraph,
  BsArrowLeftRight,
  BsLayersHalf,
  BsLayersFill,
} from "react-icons/bs";
import { TbDatabase } from "react-icons/tb";
import { RiMoneyDollarCircleLine, RiScales3Fill } from "react-icons/ri";
import Table from "../components/Tables";
import SliderMenu from "../components/Slider";
import TopSection from "../components/TopSection";
import { IMenu, ITableContent, ISearchContent } from "../@types/market";

const menus: IMenu[] = [
  {
    text: "Terbaru",
    icon: <HiOutlineSparkles className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "DeFi",
    icon: <ImLibrary className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "NFT/Gaming",
    icon: <IoGameControllerOutline className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "CEX",
    icon: <BsFileBarGraph className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "DEX",
    icon: <BsArrowLeftRight className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "Layer-1",
    icon: <BsLayersHalf className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "Infrastructure",
    icon: <TbDatabase className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "Lending",
    icon: <RiMoneyDollarCircleLine className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "Layer-2",
    icon: <BsLayersFill className="w-6 h-6 text-blue-more" />,
  },
  {
    text: "Ekosistem Stablecoin",
    icon: <RiScales3Fill className="w-6 h-6 text-blue-more" />,
  },
];

const Home: React.FC = () => {
  const [currencyGroup, setCurrencyGroup] = useState<ICurrencyGroup[]>([]);
  const [tableContent, setTableContent] = useState<ITableContent[]>([]);
  const [searchContent, setSearchContent] = useState<ISearchContent[]>([
    { crypto: <div></div> },
  ]);
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
              <div className="flex flex-row justify-between w-full">
                <div className="pl-2 flex flex-col justify-center font-bold">
                  {content.wallets?.[0]?.blockchain}
                </div>
                <div className="flex flex-col justify-center text-gray1 pr-2 lg:pr-0">
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
    getCurrencies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  return (
    <>
      <div className="md:px-4 lg:px-8 xl:px-12 py-8">
        <TopSection
          searchContent={searchContent}
          setShowSearchResult={setShowSearchResult}
          setKeyword={setKeyword}
          showSearchResult={showSearchResult}
        />
        <div className="mb-4" />
        <SliderMenu menus={menus} />
        <div className="mb-4" />
        <Table headers={headers} contents={tableContent} />
      </div>
    </>
  );
};
export default Home;
