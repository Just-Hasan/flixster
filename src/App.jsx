// import Homepage from "./Pages/Homepage";
// import SearchedResultsPage from "./Pages/SearchedResultsPage";
// import SelectedResultPage from "./Pages/SelectedResultPage";
//
import Navbar from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router";
import Footer from "./Components/Footer";
import { useSelector } from "react-redux";
import { Suspense } from "react";
//
import { lazy } from "react";
import Loader from "./Components/Loader";
const Homepage = lazy(() => import("./Pages/Homepage"));
const SearchedResultsPage = lazy(() => import("./Pages/SearchedResultsPage"));
const SelectedResultPage = lazy(() => import("./Pages/SelectedResultPage"));

function App() {
  const { theme } = useSelector((store) => store.theme);
  return (
    <main
      className={`${
        theme === "dark" ? "bg-[#1c1c1c]" : "bg-[#f4f4f4]"
      } transition-all duration-300 ease-in-out`}
    >
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index element={<Navigate to={"/home"} />} />
          <Route path="/home" element={<Homepage />} />
          <Route path={"/show"}>
            <Route path="searched" element={<SearchedResultsPage />} />
          </Route>
          <Route path="/tv">
            <Route path="selected" element={<SelectedResultPage />} />
          </Route>
          <Route path="/movie">
            <Route path="selected" element={<SelectedResultPage />} />
          </Route>
        </Routes>
      </Suspense>

      <Footer />
    </main>
  );
}

export default App;
