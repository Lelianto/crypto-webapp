import { FC } from "react";
import { ITopSection } from "../@types/market";

const TopSection: FC<ITopSection> = ({
  setKeyword,
  setShowSearchResult,
  showSearchResult,
  searchContent,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between px-5 lg:px-0">
      <div className="font-bold text-xl md:text-2xl lg:text-3xl flex flex-col justify-center mb-4 lg:mb-0">
        Harga Crypto dalam Rupiah Hari Ini
      </div>
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
            className="block bg-slate-200 relative z-20 px-4 py-2 pl-10 w-full md:w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-slate-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cari Crypto Berdasarkan Nama"
            onChange={(e) => setKeyword(e.target.value)}
            onClick={() => setShowSearchResult(true)}
          />
          {showSearchResult && (
            <button
              type="submit"
              onClick={() => setShowSearchResult(false)}
              className="text-black absolute z-30 right-1.5 bottom-1.5 font-medium rounded-lg text-sm px-2 py-1"
            >
              &#x2715;
            </button>
          )}
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
  );
};

export default TopSection;
