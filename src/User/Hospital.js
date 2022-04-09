import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";

function Hospital() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const userCollectionRef = collection(firestore, "hospitals");
    const getHospitals = async () => {
      const data = await getDocs(userCollectionRef);
      setHospitals(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getHospitals();
  }, []);

  return (
    <div className="App">
      {hospitals.map((hospital) => (
        <div>
          {" "}
          <h7>Name: {hospital.name}</h7><br/>
          <h7>Bed: {hospital.bed}</h7><br/>
          <h7>Vaccine: {hospital.vaccine}</h7>
        </div>
      ))}
    </div>
  );
}

export default Hospital;
