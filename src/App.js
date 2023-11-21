import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./assets/components/login/LoginForm";
import HomePage from "./assets/components/HomePage/HomePage";
import withAuth from "./assets/components/routes/withAuth";

const ProtectedHomePage = withAuth(HomePage);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route path="/home" element={<ProtectedHomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
