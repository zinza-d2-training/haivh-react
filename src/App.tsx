import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ForgotPage from './pages/ForgotPage';
import LoginPage from './pages/LoginPage';
import { Counter } from './features/counter/Counter';
function App() {
  return (
    // <>
    //   <Counter />
    // </>
    <Routes>
      <Route path="/" element={<LoginPage />}></Route>
      <Route path="/forgotPass" element={<ForgotPage />}></Route>
    </Routes>
  );
}

export default App;
