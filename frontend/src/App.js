import React from 'react'
import Signup from './components/Signup.tsx';
import Update from './components/Update.tsx';
import Database from './components/Database.tsx';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home.tsx';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Database" element={<Database />} />
        <Route path="/Update" element={<Update />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

/*
`${process.env.REACT_APP_API_PATH}${imageUrl}`
*/