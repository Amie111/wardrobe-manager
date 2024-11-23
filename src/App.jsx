import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UploadForm from "./components/Upload";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
