import { useState } from "react";
import MenuCard from "./MenuCard";

const ResturantMenuCategory = ({ data, showMenuItem, setCurrentMenuIndex }) => {
  const handleClick = () => {
    setCurrentMenuIndex();
  };
  return (
    <div className=" bg-gray-50 w-6/12 mx-auto my-2 p-2 shadow-lg">
      <div
        className=" flex justify-between  cursor-pointer"
        onClick={handleClick}
      >
        <span className=" font-semibold">
          {data.title}({data.itemCards.length})
        </span>
        <span>⬇️</span>
      </div>

      {showMenuItem && <MenuCard menuItems={data.itemCards} />}
    </div>
  );
};

export default ResturantMenuCategory;
