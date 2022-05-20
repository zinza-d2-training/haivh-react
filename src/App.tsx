import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import ForgotPage from './pages/ForgotPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/forgotPass" element={<ForgotPage />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
