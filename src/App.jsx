import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router";
import Footer from "./Components/Footer";
import SearchedResultsPage from "./Pages/SearchedResultsPage";
import { useSelector } from "react-redux";
import SelectedResultPage from "./Pages/SelectedResultPage";

function App() {
  const { theme } = useSelector((store) => store.theme);
  return (
    <main
      className={`${
        theme === "dark" ? "bg-[#1c1c1c]" : "bg-[#f4f4f4]"
      } transition-all duration-300 ease-in-out`}
    >
      <Navbar />
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
      <Footer />
    </main>
  );
}

export default App;
