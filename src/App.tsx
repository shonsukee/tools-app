import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProductPage from "./components/pages/ProductPage";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/Login/LoginForm";
import IngredientListPage from "./components/cookApp/IngredientList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/products" element={<ProductPage/>}  />
        <Route path="/home" element={<HomePage/>}  />
        <Route path='/cookApp/home' element={<IngredientListPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
