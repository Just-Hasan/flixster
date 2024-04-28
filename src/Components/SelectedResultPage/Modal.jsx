import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PropTypes from "prop-types";
import Button from "../../ui/Button";
import {
  addReviewsToFavourite,
  getFavouriteReviews,
} from "../../Global/FavouriteSlice";
import { useDispatch, useSelector } from "react-redux";

const ModalContext = createContext();

export default function Modal({ children, modalDetails }) {
  const { id, posterImg: posterPath, title } = modalDetails;
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const review = useSelector(getFavouriteReviews(id));
  const posterImg = `${import.meta.env.VITE_TMDB_IMG_PATH}${posterPath}`;
  console.log(review);
  const ModalContextValue = {
    open,
    openModal,
    closeModal,
    title,
    review,
    posterImg,
  };
  return (
    <ModalContext.Provider value={ModalContextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function Open() {
  const { openModal, review } = useContext(ModalContext);

  return (
    <button
      onClick={openModal}
      className={`mx-auto mt-4 w-full  rounded-full bg-red-500 p-4 text-center text-xl  uppercase text-white  hover:bg-red-600 active:bg-red-800`}
    >
      {review ? "Update Review" : "Add Review"}
    </button>
  );
}

function ReviewModal({ modalDetails = {} }) {
  const { id, title } = modalDetails;
  const { closeModal, open, review, posterImg } = useContext(ModalContext);
  const modalRef = useRef(null);
  const reviewsRef = useRef(null);
  const dispatch = useDispatch();

  const closeOnClick = useCallback(
    function (e) {
      if (modalRef.current && !modalRef.current.contains(e.target.value)) {
        closeModal();
      }
    },
    [closeModal],
  );

  useEffect(() => {
    document.addEventListener("click", closeOnClick, true);
    return document.removeEventListener("click", closeOnClick);
  }, [closeOnClick]);

  return (
    <div
      className={`${!open ? "invisible opacity-0" : "opacity-100"} fixed left-0 top-0 z-[3000] grid h-full w-full place-content-center bg-black bg-opacity-50 backdrop-blur-md transition-all duration-300 ease-in-out`}
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
                      id: Number(id),
                      reviews: reviewsRef.current.value,
                    }),
                    closeModal(),
                  )
                }
              >
                Save Review
              </Button>
              <button
                type="secondary"
                onClick={closeModal}
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

Modal.Open = Open;
Modal.ReviewModal = ReviewModal;

Modal.propTypes = {
  children: PropTypes.any,
  modalDetails: PropTypes.object,
};
Open.propTypes = {
  children: PropTypes.any,
};
ReviewModal.propTypes = {
  modalDetails: PropTypes.object,
};
