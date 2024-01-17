import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    avgRating,
    cloudinaryImageId,
    cuisines,
    costForTwo,
    deliveryTime,
  } = resData;

  const styleCard = {
    backgroundColor: "#f0f0f0",
  };

  return (
    <div className="p-4 m-4 w-[200px] rounded-lg bg-gray-50 hover:bg-gray-400">
      <img
        className="rounded-lg "
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-2 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{resData?.sla?.deliveryTime} minutes</h4>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
