import { useParams } from "react-router-dom";
import useResturantMenu from "../utils/useResturantMenu";
import ShimerUI from "./ShimerUI";
import ResturantMenuCategory from "./ResturantMenuCategory";
import { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
const RestaurantInfo = () => {
  const { resid } = useParams();

  const resInfo = useResturantMenu(resid);

  const [currentMenuIndex, setCurrentMenuIndex] = useState(null);

  const { loggedInUser } = useContext(UserContext);

  if (resInfo === null) {
    return <ShimerUI />;
  }

  //Resturent Information
  const { name, cuisines, avgRating, totalRatingsString, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;

  //Menu details
  const { itemCards } =
    resInfo?.cards[4].groupedCard?.cardGroupMap?.REGULAR.cards[2]?.card?.card;

  const menuCategory =
    resInfo?.cards[4].groupedCard?.cardGroupMap?.REGULAR.cards.filter((c) => {
      return (
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );
    });

  const currentMenuIndexHandler = (index) => {
    if (index === currentMenuIndex) {
      setCurrentMenuIndex(null);
    } else {
      setCurrentMenuIndex(index);
    }
  };
  return (
    <div className="res-info text-center my-2">
      <h1 className="font-bold text-2xl p-5">{name}</h1>
      <h2 className=" font-semibold">
        {cuisines.join(" ")}, {costForTwoMessage}
      </h2>
      <h2 className=" font-semibold">
        {avgRating}⭐ / {totalRatingsString}
      </h2>
      <h2 className=" font-semibold text-xl">~:Menu:~</h2>
      <h2 className=" font-semibold text-xl">{loggedInUser}</h2>
      {menuCategory.map((category, index) => {
        return (
          <ResturantMenuCategory
            data={category.card.card}
            key={category.card.card.title}
            showMenuItem={index === currentMenuIndex ? true : false}
            setCurrentMenuIndex={() => {
              currentMenuIndexHandler(index);
            }}
          />
        );
      })}
    </div>
  );
};

export default RestaurantInfo;
