import { FOOD_CARD_IMG_URL } from "../utils/constants";

const ResturentCard = (props) => {
  const { resdata } = props;
  const { cloudinaryImageId, name, cuisines, costForTwo, sla, avgRating } =
    resdata?.info;

  return (
    <div className="m-4 p-4 w-[250px] bg-pink-100 rounded-lg hover:bg-pink-200">
      <img
        className=" rounded-lg"
        alt="Biryani"
        src={FOOD_CARD_IMG_URL + cloudinaryImageId}
      />
      <h3 className=" font-bold p-1 m-1 text-lg">{name}</h3>
      <div className="res-card-dec">
        <p>{avgRating} ⭐</p>
        <h4>{cuisines.join(" ")}</h4>
        <h4>{costForTwo}</h4>
        <h4>⌚{sla.slaString}</h4>
      </div>
    </div>
  );
};

export const withPromoted = (ResturentCard) => {
  return (props) => {
    return (
      <div>
        <label className=" absolute bg-green-500 text-white  p-1 rounded-lg">
          Veg
        </label>
        <ResturentCard {...props} />
      </div>
    );
  };
};

export default ResturentCard;
