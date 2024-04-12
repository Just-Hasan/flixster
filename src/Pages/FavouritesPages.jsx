import { useSelector, useDispatch } from "react-redux";
import { getFavourite } from "../Global/FavouriteSlice";
import Button from "../ui/Button";
import FavouriteCard from "../Components/FavouritesPages/FavouriteCard";
export default function FavouritesPages() {
  const favourite = useSelector(getFavourite);
  console.log(favourite);
  return favourite?.length !== 0 ? (
    <div className="mx-auto w-[90%] pb-24 pt-48">
      <div className="mb-14">
        <h2 className="text-[24px] capitalize">your favourite show</h2>
      </div>
      <ul className="grid grid-cols-3 gap-4">
        {favourite?.map((movie) => {
          return <FavouriteCard key={movie.id} movie={movie} />;
        })}
      </ul>
    </div>
  ) : (
    <div className=" flex h-[100vh] flex-col place-content-center items-center justify-center">
      <h2 className="mb-8 text-6xl capitalize">
        Start adding your favourite show
      </h2>
      <Button to={"/home"} type="primary">
        Add now
      </Button>
    </div>
  );
}
