import { GoogleAuthProvider } from "firebase/auth";
import { collection,getDocs,addDoc, updateDoc, doc, deleteDoc,arrayUnion, arrayRemove, getDoc} from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";
import { Container,Form, Alert, InputGroup,Table, Button } from "react-bootstrap";

function Patient() {
    const [patientID,setPatientID]=useState("");
    const [patientData,setPatientData]=useState([]);

    const getPatientInfo = async() =>{
        let doctorref = doc(firestore, "patient", patientID)
        let patientSnap = await getDoc(doctorref);
        if (patientSnap.exists()) {
            console.log("Document data:", patientSnap.data());
            setPatientData(patientSnap.data());
            //console.log(patientData.name);
          } else {
            console.log("No such document!");
          }
      };

    return (
     <>
    <div className="p-4 box">

    <Container style={{ 'width': "400px" , display:'flex',padding :'5px' }}>
    <Form style={{'max-width':'400px','text-align':'center'}}>
      <Form.Group className="mb-3" controlId="formItemMax" >
        <InputGroup>
          <InputGroup.Text id="formItemMax"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Patient ID"
            onChange={(e) => setPatientID(e.target.value)}
          />
        </InputGroup>
      </Form.Group>
      
    </Form>
    <button variant="primary" className="edit" onClick={getPatientInfo} style ={{'margin-left':'5px'}}>
      Get Details
            </button>
    </Container>
    </div>
    <Container style={{ width: "1000px" }}>
    <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Patient Name:</th>
            <td>{patientData.name}</td>
          </tr>
          <tr>
            <th>Patient Age: </th>
            <td>{patientData.age}</td>
          </tr>
          <tr>
            <th>Last Visited:</th>
            <td>{patientData.dueDate}</td>
          </tr>
          <tr>
            <th>Issues:</th>
            <td>{patientData.Issues}</td>
          </tr>
          <tr>
            <th>Lab:</th>
            <td>{patientData.labAssigned}</td>
          </tr>
          <tr>
            <th>Doctor Assigned:</th>
            <td>{patientData.doctorAssigned}</td>
          </tr>

        </thead>
        
      </Table>
      </Container>
    </>
  );
}

export default Patient;



