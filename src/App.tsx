import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppSelector } from './app/hooks';
import Register from './components/Register/Register';
import AdminPage from './pages/AdminPage';
import ForgotPage from './pages/ForgotPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import RegistrationPageOne from './pages/RegistrationPageOne';
import RegistrationPageThree from './pages/RegistrationPageThree';
import RegistrationPageTwo from './pages/RegistrationPageTwo';
import UserPage from './pages/UserPage';

function App() {
  const status = useAppSelector((state) => state.user.status);
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route index element={<HomePage />}></Route>
        <Route
          path="registration-step-1"
          element={<RegistrationPageOne />}></Route>
        <Route
          path="registration-step-2"
          element={<RegistrationPageTwo />}></Route>
        <Route
          path="registration-step-3"
          element={<RegistrationPageThree />}></Route>
        <Route path="user-info" element={<UserPage />}></Route>
        <Route path="admin" element={<AdminPage />}></Route>
      </Route>
      <Route
        path="/login"
        element={
          status === 'succeeded' ? <Navigate to="/" /> : <LoginPage />
        }></Route>
      <Route path="/forgotPass" element={<ForgotPage />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
