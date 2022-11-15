import { FC } from "react";
import { ITableContent } from "../@types/market";
import { ITable } from "../@types/market";

const Table: FC<ITable> = ({ headers, contents }) => {
  const headersRowStyle = "border-t border-slate-300";
  return (
    <>
      <div className="border-t border-b md:border md:rounded-lg border-slate-300">
        <table className="w-full">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <td
                  key={`header-${index}`}
                  className={[
                    header.style,
                    `${index > 1 && "hidden md:table-cell"}`,
                  ].join(" ")}
                >
                  {index === 1 ? (
                    <>
                      <div className="hidden md:block">{header.text}</div>
                      <div className="block md:hidden text-right pr-5">
                        <select
                          className="border border-slate-300 rounded-md text-sm"
                          name="cars"
                          id="cars"
                        >
                          <option value="day">24 Jam</option>
                          <option value="week">1 Week</option>
                          <option value="month">1 Month</option>
                          <option value="year">1 Year</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>{header.text}</>
                  )}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {contents.map((content: ITableContent, id) => {
              return (
                <tr key={`content-${id}`} className={headersRowStyle}>
                  {Object.keys(content).map((key, index) => (
                    <td
                      key={`column-content-${index}`}
                      className={`${
                        index > 1 ? "hidden md:table-cell" : "w-1/2 md:w-auto"
                      }`}
                    >
                      {content[key as keyof ITableContent]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
