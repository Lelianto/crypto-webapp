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
const SliderMenu = () => {
  const menus = [
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
  return (
    <>
      <div className="flex overflow-auto">
        {menus.map((menu) => {
          return (
            <div className="pr-2 block">
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
