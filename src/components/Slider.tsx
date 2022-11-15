import { FC } from "react";
import { ISliderMenu, IMenu } from "../@types/market";

const SliderMenu: FC<ISliderMenu> = ({ menus }) => {
  return (
    <>
      <div className="flex overflow-auto pl-2 md:pl-0">
        {menus.map((menu: IMenu) => {
          return (
            <div key={`${menu.text}`} className="pr-2 block">
              <div className="flex bg-blue-light py-2 px-2 rounded-md">
                <div className="flex flex-col justify-center">{menu.icon}</div>
                <div className="ml-2 flex flex-col justify-center text-sm font-bold text-blue-more min-w-max">
                  {menu.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SliderMenu;
