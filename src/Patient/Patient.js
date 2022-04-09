import { GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";
import "./Patient.css";

function Patient() {
  const [patient, setPatient] = useState([]);

  useEffect(() => {
    const userCollectionRef = collection(firestore, "patient");
    const getPatient = async () => {
      const data = await getDocs(userCollectionRef);
      console.log(data);
      setPatient(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPatient();
  }, []);

  return (
    <div>
    <table className="content-table" classNamestyle={{ margin: "50px", 'text-align': 'center', 'padding':'20px' }}>
        <thead>
          <th>Patient ID</th>
          <th>Name</th>
          <th>DESIRED</th>
          <th>CRITICAL</th>
          <th>STATUS</th>
        </thead>
        <tbody>
          {
            patient.map((patient,idx) => {
              return (
                <tr key={idx}>
                  <td>{patient.id}</td>
                  <td>{patient.CurrentAmount}</td>
                  <td>{patient.Desired}</td>
                  <td>{patient.Critical}</td>
                  <td>
                    { (() => {
        if (patient.CurrentAmount>patient.Desired) {
          return "good"
        } else if (patient.CurrentAmount<patient.Critical) {
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

export default Patient;
