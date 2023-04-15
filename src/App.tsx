import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductPage from "./components/pages/ProductPage";
import HomePage from "./components/pages/HomePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductPage/>}  />
        <Route path="/home" element={<HomePage/>}  />
      </Routes>
    </Router>
  );
};

export default App;

