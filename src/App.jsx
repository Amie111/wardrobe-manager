import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UploadForm from "./components/UploadForm";
import Home from "./pages/Home";
import CreateOutfit from "./pages/CreateOutfit";
import Outfits from "./components/Outfit";
import ClothingDetail from "./pages/ClothingDetail";
import OutfitDetail from "./pages/OutfitDetail";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/create-outfit" element={<CreateOutfit />} />
          <Route path="/outfits" element={<Outfits />} />
          <Route path="/clothing/:id" element={<ClothingDetail />} />
          <Route path="/outfit/:id" element={<OutfitDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
