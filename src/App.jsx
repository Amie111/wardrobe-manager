import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UploadForm from "./components/UploadForm";
import Home from "./pages/Home";
import CreateOutfit from "./pages/CreateOutfit";
import Outfits from "./components/Outfit";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/create-outfit" element={<CreateOutfit />} />
          <Route path="/outfits" element={<Outfits />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
