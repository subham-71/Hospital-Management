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
    const [quantity,setQuantity]=useState(0);
    const [inventory,setInventory]=useState("");

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
    <Button variant="primary" className="edit" onClick={getPatientInfo}>
      Get Patient Details
            </Button>
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

        </thead>
        
      </Table>
      </Container>
    <div>
        
      
    <Container style={{ width: "400px" }}>
    <Form style={{'max-width':'400px','text-align':'center'}}>
      <Form.Group className="mb-3" controlId="formItemMax" >
        <InputGroup>
          <InputGroup.Text id="formItemMax"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Issue Name"
            onChange={(e) => setIssue(e.target.value)}
          />
        </InputGroup>
      </Form.Group>
      
    </Form>
    <Button variant="secondary" className="edit" onClick={addNewIssue}>
      Add Issue
    </Button>
    <Button variant="danger" className="edit" onClick={deleteIssue}>
      Delete Issue
    </Button>
    </Container>
    
    <br/>
    <Container style={{ width: "400px" }}>
    <Form style={{'max-width':'400px','text-align':'center'}}>
      <Form.Group className="mb-3" controlId="formItemMax" >
        <InputGroup>
          <InputGroup.Text id="formItemMax"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Lab ID"
            onChange={(e) => setLab(e.target.value)}
          />
        </InputGroup>
      </Form.Group>
      
    </Form>
    <Button variant="secondary" className="edit" onClick={addNewIssue}>
      Assign Lab
    </Button>
    </Container>
    
      <br/><h7>Treated Patients</h7><br/>
      <input 
        placeholder="Your Name"
        onChange={(e)=>{
          setDoctorName(e.target.value);
        }}
      />
      <button onClick={removePatient}>Remove Patient</button>
    </div>
    <br/><h7>Add Inventory</h7><br/>
    <input 
        placeholder="Inventory"
        onChange={(e)=>{
          setDoctorName(e.target.value);
        }}
      />
      <input 
        placeholder="Quantity"
        onChange={(e)=>{
          setQuantity(e.target.value);
        }}
      />
    </>
  );
}

export default Doctor;
