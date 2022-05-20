import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ForgotPage from './pages/ForgotPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/forgotPass" element={<ForgotPage />}></Route>
    </Routes>
  );
}

export default App;
