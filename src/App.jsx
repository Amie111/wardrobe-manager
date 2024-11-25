import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UploadForm from "./components/Upload";
import Home from "./pages/Home";
// import Outfit from "./pages/Outfit";
// import CreateOutfit from "./pages/CreateOutfit";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
          {/* <Route path="/outfit" element={<Outfit />} />
          <Route path="/create" element={<CreateOutfit />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
