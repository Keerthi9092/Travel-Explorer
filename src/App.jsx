import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import Favourites from "./pages/Favourites";
import Planner from "./pages/Planner";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/planner" element={<Planner />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}