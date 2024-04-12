import { Rating } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getTheme } from "../../Global/ThemeSlice";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import PropTypes from "prop-types";
import {
  addToFavourite,
  getFavourite,
  getFavouriteRating,
  getIsInsideFavourite,
  removeFromFavourite,
} from "../../Global/FavouriteSlice";

export default function AddToFavouriteSection({ favShowData }) {
  const theme = useSelector(getTheme);
  const [userRating, setUserRating] = useState(0);
  const dispatch = useDispatch();
  const favData = { ...favShowData, rating: userRating };
  const favourite = useSelector(getFavourite);
  const isInFavourite = useSelector(getIsInsideFavourite(favShowData?.id));

  // Rating if it's already in favouriteArray
  const rating = useSelector(getFavouriteRating(favShowData?.id));
  console.log(favShowData);
  return (
    <section className="my-24 ">
      <div className="mx-auto w-max">
        {!isInFavourite && (
          <h3 className="mb-6 text-center text-[24px]">Rate this show</h3>
        )}
        <div
          className={`flex w-max flex-col ${theme === "dark" ? "bg-blueNight" : "bg-stone-200"} p-8`}
        >
          {isInFavourite ? (
            <div className="mb-5 flex items-center gap-x-4">
              <p className="text-center text-4xl">
                You rate this show {rating}
              </p>
              <FaStar
                className={`text-[32px] ${theme === "dark" ? "text-accent" : "text-blueNight"}`}
              />
            </div>
          ) : (
            <Rating
              size="large"
              max={10}
              precision={0.5}
              value={userRating}
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: "4.2rem",
                },
                "& .MuiRating-iconEmpty": {
                  color: theme === "dark" ? "#fee715" : "#032440", // Yellow outline for empty stars
                },
                "& .MuiRating-iconFilled": {
                  color: theme === "dark" ? "#fee715" : "#032440", // Red filled stars
                },
              }}
              onChange={(e) => setUserRating(Number(e.target.value))}
            ></Rating>
          )}
          {!isInFavourite ? (
            <button
              onClick={() => {
                dispatch(addToFavourite(favData));
              }}
              className="mx-auto mt-4 w-max rounded-full  bg-red-500 p-4 text-center text-xl uppercase text-white ring-2 ring-white hover:bg-red-600 active:bg-red-800"
            >
              Add to favourite
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(removeFromFavourite(favShowData?.id));
              }}
              className="mx-auto mt-4 w-max rounded-full  bg-red-500 p-4 text-center text-xl uppercase text-white ring-2 ring-white hover:bg-red-600 active:bg-red-800"
            >
              Remove from favourite
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

AddToFavouriteSection.propTypes = {
  favShowData: PropTypes.object,
};
