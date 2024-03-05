import Homepage from "./Pages/Homepage";
import Navbar from "./Components/Navbar";
import { Route, Routes, Navigate } from "react-router";

function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route index element={<Navigate to={"/home"} />} />
        <Route path="/home" element={<Homepage />} />
      </Routes>
    </main>
  );
}

export default App;
