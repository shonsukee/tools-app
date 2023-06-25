import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import SignUp from "./components/Login/SignUp";
import SignIn from "./components/Login/SignIn";
import NewsPage from "./components/pages/NewsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
