import React from "react";
import { useAuth } from "./Contexts/AuthContext";
import Hospital from "./User/Hospital";
import Inventory from "./User/Inventory";

function Temp() {
  const { currentUser} = useAuth();

  return (
    <div>
      <h1>Current User</h1>
      <h2>{currentUser.email}</h2>
      <h2>{currentUser.user}</h2>
      <h2>Available Hospitals</h2>
      <Hospital/>
      <h2>Inventories</h2>
      <Inventory/>
    </div>
  );
}

export default Temp;
