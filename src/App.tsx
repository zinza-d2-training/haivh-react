import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ForgotPage from './pages/ForgotPage';
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<ForgotPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/forgotPass" element={<ForgotPage />}></Route>
    </Routes>
  );
}

export default App;
