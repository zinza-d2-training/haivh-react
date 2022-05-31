import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import ForgotPage from './pages/ForgotPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPageOne from './pages/RegistrationPageOne';
import RegistrationPageThree from './pages/RegistrationPageThree';
import RegistrationPageTwo from './pages/RegistrationPageTwo';
import UserPage from './pages/UserPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/forgotPass" element={<ForgotPage />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/registration-step-1"
        element={<RegistrationPageOne />}></Route>
      <Route
        path="/registration-step-2"
        element={<RegistrationPageTwo />}></Route>
      <Route
        path="/registration-step-3"
        element={<RegistrationPageThree />}></Route>
      <Route path="/user-info" element={<UserPage />}></Route>
    </Routes>
  );
}

export default App;
