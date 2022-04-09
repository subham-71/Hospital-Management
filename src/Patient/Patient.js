import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";
import { Table, Container } from "react-bootstrap";
import "./Patient.css";

function Patient() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const userCollectionRef = collection(firestore, "patient");
    const getPatients = async () => {
      const data = await getDocs(userCollectionRef);
      setPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPatients();
  }, []);

  return (
    <>
      <Container>
        <div style={{ marginTop: "20px" }}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Doctor Assigned</th>
                <th>Last Visited</th>
                <th>Expected Recovery</th>
                <th>Issues</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, idx) => {
                return (
                  <tr key={idx}>
                    <td>{patient.id}</td>
                    <td>{patient.personalDetail["name"]}</td>
                    <td>{patient.personalDetail["age"]}</td>
                    <td>{patient.doctorAssigned}</td>
                    <td>{patient.lastVisited}</td>
                    <td>{patient.dueDate}</td>
                    <td>{patient.Issues[0]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default Patient;
