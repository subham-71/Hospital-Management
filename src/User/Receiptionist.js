import { GoogleAuthProvider } from "firebase/auth";
import { collection,getDocs,addDoc, updateDoc, doc, deleteDoc,arrayUnion, arrayRemove} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Container,Form, Alert, InputGroup,Table, Button } from "react-bootstrap";
import { firestore } from "../Components/Auth/FireBase";
import "./Receiptionist.css";

function Receiptionist() {
  const [doctors, setDoctors] = useState([]);
  const [labs, setLabs] = useState([]);
  const [doctorName,setDoctorName]=useState("");
  const [name,setname]=useState("");
  const [age,setage]=useState("");
  const [patientID,setPatientID]=useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });


  // const createUser = async () =>{
  //   await addDoc(ref,{Name:newName,Email:newEmail,Credit:10}) 
  // };

  

const userCollectionRef = collection(firestore, "doctor");
const getDoctors = async () => {
  const data = await getDocs(userCollectionRef);
  setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};



  const addUser = async() =>{
     const newItem = {
      name,
      age,
    };

    let patientref = collection(firestore, "patient" )
    addDoc(patientref,newItem).then(()=>{
      getDoctors();
    });
 
  };
  const updateUser = async() =>{
    console.log("hi");
    let doctorref = doc(firestore, "doctor", doctorName)
    updateDoc(doctorref,{PatientID: arrayUnion(patientID)}).then(()=>{
      getDoctors();
    });
  };

  const deleteUser= async() =>{
    let doctorref = doc(firestore, "doctor", doctorName)
    updateDoc(doctorref,{PatientID: arrayRemove(patientID)}).then(()=>{
      getDoctors();
    });
  }

  useEffect(() => {
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
    <>
    <div className="p-4 box" >
    <Container style={{ width: "400px" }}>
    <Form style={{'max-width':'400px','text-align':'center'}}>
      <Form.Group className="mb-3" controlId="formItemMax" >
        <InputGroup>
          <InputGroup.Text id="formItemMax"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="New Patient Name"
            onChange={(e) => setname(e.target.value)}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formItemMax">
        <InputGroup>
          <InputGroup.Text id="formItemMax"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="New Patient Age"
            onChange={(e) => setage(e.target.value)}
          />
        </InputGroup>
      </Form.Group>
    </Form>
    </Container>

    <Container style={{ width: "400px" }}>
    <div class ="flex-container" >
          
            <Button variant="secondary" className="edit" onClick={addUser}>
              Add New Patient
            </Button>
      
          </div>
      </Container>
    </div >
    <div className="p-4 box">
    
    <Container style={{ width: "400px" }}>
    <Form style={{'max-width':'400px','text-align':'center'}}>
      <Form.Group className="mb-3" controlId="formItemMax" >
        <InputGroup>
          <InputGroup.Text id="formItemMax"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Doctor Name"
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formItemMax">
        <InputGroup>
          <InputGroup.Text id="formItemMax"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="patient ID"
            onChange={(e) => setPatientID(e.target.value)}
          />
        </InputGroup>
      </Form.Group>
    </Form>
    </Container>

    <Container style={{ width: "400px" }}>
    <div class ="flex-container" >
          
            <Button variant="secondary" className="edit" onClick={updateUser}>
              Add Patient ID
            </Button>
      
            <Button variant="danger" className="delete"  type="Submit" onClick={deleteUser}>
              Remove Patient ID
            </Button>
          </div>
      </Container>
    </div >
    <div  className="p-table">
    <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>NAME</th>
            <th>SPECIALIZATION</th>
            <th>PATIENT ID</th>
            <th>WORKING DAYS</th>
          </tr>
        </thead>
        <tbody>
          {
            doctors.map((doctor,idx) => {
              return (
                <tr key={idx}>
                  <td>{doctor.id}</td>
                  <td>{doctor.Specialization}</td>
                  <td>{doctor.PatientID}</td>
                  <td>{doctor.WorkingDays}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  
    </>
  );
}

export default Receiptionist;
