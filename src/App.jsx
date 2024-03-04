import { useEffect } from "react";
import Homepage from "./Pages/Homepage";
import { useState } from "react";

const API_KEY = "b1646a12184b3234cde60f578c6c19ec";

function App() {
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    getData();
  }, [page]);

  return (
    <main>
      <Homepage />
      <div>
        <button onClick={() => setPage((page) => page + 1)}>Add</button>
        <p>current page : {page}</p>
        <button onClick={() => setPage((page) => page - 1)}>Decr</button>
      </div>
    </main>
  );
}

export default App;
