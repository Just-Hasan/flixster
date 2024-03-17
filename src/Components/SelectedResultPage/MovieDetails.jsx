import PropTypes from "prop-types";

export default function MovieDetails({
  type,
  release_date,
  production_countries,
  first_air_date,
  created_by,
  budget,
  revenue,
  status,
}) {
  return (
    <div className="grid grid-cols-[auto,auto,auto] justify-start gap-[16px] text-[16px]">
      <p>{type === "movie" ? "Release Date" : "First Airing"}</p>
      <p>:</p>
      <p>{type === "movie" ? release_date : first_air_date}</p>
      {/*  */}
      <p>Countries</p>
      <p>:</p>
      <p className="text-left">{production_countries?.at(0)?.name}</p>
      {/*  */}
      <p>Status</p>
      <p>:</p>
      <p className="text-left">{status}</p>
      {/*  */}
      {budget > 0 && (
        <>
          <p>Budget</p>
          <p>:</p>
          <p className="text-left">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(budget)}
          </p>
        </>
      )}

      {/*  */}
      {revenue > 0 && (
        <>
          {" "}
          <p>Revenue</p>
          <p>:</p>
          <p className="text-left">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(revenue)}
          </p>
        </>
      )}

      {/*  */}
      {created_by && created_by?.length !== 0 && (
        <>
          <p>Producer</p>
          <p>:</p>
          <p className="text-left leading-[1.5]">
            {created_by?.map((producer, i, arr) => {
              return (
                <span key={producer.id}>
                  {producer.name}
                  {i < arr.length - 1 ? ", " : ""}
                </span>
              );
            })}
          </p>
        </>
      )}
    </div>
  );
}

MovieDetails.propTypes = {
  type: PropTypes.string,
  release_date: PropTypes.string,
  production_countries: PropTypes.array,
  first_air_date: PropTypes.string,
  created_by: PropTypes.array,
  budget: PropTypes.any,
  status: PropTypes.any,
  revenue: PropTypes.any,
};
