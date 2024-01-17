import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import restaurantList from "../utils/mockData";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import UserContext from "../utils/userContext";

const Body = () => {
  const [listofRestaurants, setListofRestaurants] = useState();
  const [angad, setAngad] = useState();
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const { loggedInUser, setUserName } = useContext(UserContext);

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
    );

    const jsondata = await data?.json();

    console.log(jsondata);

    setAngad(
      jsondata?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  useEffect(() => {
    const wassup = angad?.map((res) => res.info);
    setListofRestaurants(wassup);
    setFilteredRestaurant(wassup);
  }, [angad]);

  return (
    <div className="body">
      <div className="flex">
        <div className="search m-2 p-4">
          <input
            type="text"
            className="border border-solid border-black m-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-1 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              const filteredrestaurants = listofRestaurants.filter((res) =>
                res.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredrestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = restaurantList.filter(
                (res) => res.data.avgRating > 4
              );
              setListofRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div className="search m-4 p- flex items-center">
          <label>UserName: </label>
          <input
            className="border border-black p-2"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      </div>
      <div className="res-container">
        <div className="flex flex-wrap">
          {filteredRestaurant?.map((res) => (
            <Link to={"restaurants/" + res.id} key={res.id}>
              {res.promoted ? (
                <RestaurantCardPromoted resData={res} />
              ) : (
                <RestaurantCard resData={res} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
