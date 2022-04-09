import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import Temp from "../Temp";
import Patient from "../Patient/Patient";

const Rautes = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Temp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/patient" element={<Patient />} />
        </Routes>
    </>
  );
};

export default Rautes;
