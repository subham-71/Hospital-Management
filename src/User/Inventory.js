import { GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";
import "./Inventory.css";

function Inventory() {
  const [inventorys, setInventorys] = useState([]);

  useEffect(() => {
    const userCollectionRef = collection(firestore, "inventory");
    const getInventorys = async () => {
      const data = await getDocs(userCollectionRef);
      setInventorys(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getInventorys();
  }, []);

  return (
    <div>
    <table className="content-table" classNamestyle={{ margin: "50px", 'text-align': 'center', 'padding':'20px' }}>
        <thead>
          <th>NAME</th>
          <th>CURRENT AMOUNT</th>
          <th>DESIRED</th>
          <th>CRITICAL</th>
          <th>STATUS</th>
        </thead>
        <tbody>
          {
            inventorys.map((inventory,idx) => {
              return (
                <tr key={idx}>
                  <td>{inventory.id}</td>
                  <td>{inventory.CurrentAmount}</td>
                  <td>{inventory.Desired}</td>
                  <td>{inventory.Critical}</td>
                  <td>
                    { (() => {
        if (inventory.CurrentAmount>inventory.Desired) {
          return "good"
        } else if (inventory.CurrentAmount<inventory.Critical) {
          return "bad";
        } else {
          return "satisfactory"
        }
      })()
                    }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;
