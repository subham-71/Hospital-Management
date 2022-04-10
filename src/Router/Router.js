import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
import Patient from "../User/Patient"
import Receiptionist from "../User/Receiptionist";
import Head from "../Components/Header";
import Inventory from "../Inventory/App";
import Doctor from "../User/Doctor";
import Lab from "../User/Lab"

const Rautes = () => {
  return (
    <>
      <Head />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/doctor" element={<Doctor/>} />
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/lab" element={<Lab/>}/>
        <Route path="/receiptionist" element={<Receiptionist />} />
        <Route path="/" element={<Receiptionist />} />
      </Routes>
    </>
  );
};

export default Rautes;
