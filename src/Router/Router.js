import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import Temp from "../Temp";
import Patient from "../Patient/Patient";
import Receiptionist from "../User/Receiptionist";
import Head from "../Components/Header";
import Inventory from "../Inventory/App";

const Rautes = () => {
  return (
    <>
      <Head />
      <Routes>
        <Route path="/" element={<Temp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/receiptionist" element={<Receiptionist />} />
      </Routes>
    </>
  );
};

export default Rautes;
