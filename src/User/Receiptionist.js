import { GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";
import "./Inventory.css";

function Receiptionist() {
  const [doctors, setDoctors] = useState([]);
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const userCollectionRef = collection(firestore, "doctor");
    const getDoctors = async () => {
      const data = await getDocs(userCollectionRef);
      setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDoctors();
  }, []);

  useEffect(() => {
    const userCollectionRef = collection(firestore, "lab");
    const getLabs = async () => {
      const data = await getDocs(userCollectionRef);
      setLabs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLabs();
  }, []);

  return (
    <div>
    <table className="content-table" classNamestyle={{ margin: "50px", 'text-align': 'center', 'padding':'20px' }}>
        <thead>
          <th>NAME</th>
          <th>CURRENT AMOUNT</th>
          <th>DESIRED</th>
          <th>CRITICAL</th>
        </thead>
        <tbody>
          {
            doctors.map((doctor,idx) => {
              return (
                <tr key={idx}>
                  <td>{doctor.id}</td>
                  <td>{doctor.CurrentAmount}</td>
                  <td>{doctor["Patient ID"]}</td>
                  <td>{doctor["Working Days"]}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Receiptionist;
