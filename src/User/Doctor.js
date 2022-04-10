import { GoogleAuthProvider } from "firebase/auth";
import { collection,getDocs,addDoc, updateDoc, doc, deleteDoc,arrayUnion, arrayRemove, getDoc} from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";
import { Container,Form, Alert, InputGroup,Table, Button } from "react-bootstrap";


function Doctor() {
    const [patientID,setPatientID]=useState("");
    const [patientData,setPatientData]=useState([]);
    const [issue,setIssue]= useState("");
    const [lab,setLab]=useState("");
    const [doctorName,setDoctorName]=useState("");

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
      
      const assignLab = async() =>{
        let doctorref = doc(firestore, "patient", patientID)
        updateDoc(doctorref,{labAssigned: arrayUnion(lab)}).then(()=>{
            getPatientInfo();
        });
      };

      const addNewIssue = async() =>{
        let doctorref = doc(firestore, "patient", patientID)
        updateDoc(doctorref,{Issues: arrayUnion(issue)}).then(()=>{
            getPatientInfo();
        });
      };
    
      const deleteIssue= async() =>{
        let doctorref = doc(firestore, "patient", patientID)
        updateDoc(doctorref,{Issues: arrayRemove(issue)}).then(()=>{
            getPatientInfo();
        });
      }

      const removePatient= async() =>{
        let doctorref = doc(firestore, "doctor", doctorName)
        updateDoc(doctorref,{PatientID: arrayRemove(patientID)}).then(()=>{
            setPatientID("");
        });
      }

  return (
     <>
    <div className="p-4 box">
      
    <Container style={{ width: "400px" }}>
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
    </Container>
    </div>
    <div>
      <input 
        placeholder="...Patient ID"
        onChange={(e)=>{
          setPatientID(e.target.value);
        }}
       />
      <button onClick={getPatientInfo}>Get Patient Details</button>
      
    <div>Patient Name: {patientData.name}</div>
    <div>Patient Age: {patientData.age}</div>
    <div>Last Visited: {patientData.dueDate}</div>
    <div>Issues: {patientData.Issues}</div>
    <div>Lab: {patientData.labAssigned}</div>
    <input 
        placeholder="...Issue Name"
        onChange={(e)=>{
          setIssue(e.target.value);
        }}
    />
    <button onClick={addNewIssue}>Add New Issue</button>
    <button onClick={deleteIssue}>Delete Issue</button>
    <br/>
    <input 
        placeholder="Lab ID"
        onChange={(e)=>{
          setLab(e.target.value);
        }}
      />
      <button onClick={assignLab}>Assign Lab</button>
      <br/><h7>Treated Patients</h7><br/>
      <input 
        placeholder="Your Name"
        onChange={(e)=>{
          setDoctorName(e.target.value);
        }}
      />
      <button onClick={removePatient}>Remove Patient</button>
    </div>
    </>
  );
}

export default Doctor;
