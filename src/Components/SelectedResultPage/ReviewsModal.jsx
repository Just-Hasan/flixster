import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addReviewsToFavourite,
  getFavouriteReviews,
} from "../../Global/FavouriteSlice";
export default function ReviewsModal({
  selectedShowId,
  title,
  posterImg,
  setOpenReview,
  openReview,
}) {
  const modalRef = useRef(null);
  const reviewsRef = useRef("");
  const review = useSelector(getFavouriteReviews(selectedShowId));
  const dispatch = useDispatch();
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenReview(false); // Close the modal when clicking outside
      }
    }

    // Add event listener when the modal is open
    if (setOpenReview) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenReview]);

  return (
    <div
      className={`${!openReview ? "invisible  opacity-0" : "opacity-100"} fixed left-0 top-0 z-[3000] grid h-full w-full place-content-center bg-black bg-opacity-50 backdrop-blur-md transition-all duration-300 ease-in-out`}
    >
      <div
        ref={modalRef}
        className="mx-auto flex w-[50vw] gap-x-8  bg-blueNight p-4 text-white"
      >
        <img src={posterImg} className="h-[400px] w-[300px]" />
        <div className="w-full">
          <h3 className="mb-12 text-4xl">
            What do you think about <b>{title}</b>
          </h3>
          <div className="h-1/2">
            <textarea
              defaultValue={review || ""}
              placeholder="Your Reviews"
              ref={reviewsRef}
              className={`h-full w-full p-4 text-2xl text-black `}
            ></textarea>
            <div className="mt-4 flex items-center justify-end gap-x-4">
              <Button
                type="primary"
                handlerFunc={() =>
                  dispatch(
                    addReviewsToFavourite({
                      id: Number(selectedShowId),
                      reviews: reviewsRef.current.value,
                    }),
                    setOpenReview(false),
                  )
                }
              >
                Save Review
              </Button>
              <button
                type="secondary"
                onClick={() => setOpenReview(false)}
                className={"rounded-full p-4 text-2xl ring-2 ring-white"}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReviewsModal.propTypes = {
  selectedShowId: PropTypes.number,
  title: PropTypes.string,
  posterImg: PropTypes.string,
  setOpenReview: PropTypes.any,
  openReview: PropTypes.any,
  reviews: PropTypes.any,
  setReviews: PropTypes.any,
};
