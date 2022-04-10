import { GoogleAuthProvider } from "firebase/auth";
import { collection,getDocs,addDoc, updateDoc, doc, deleteDoc,arrayUnion, arrayRemove} from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";

function Receiptionist() {
  const [doctors, setDoctors] = useState([]);
  const [labs, setLabs] = useState([]);
  const [doctorName,setDoctorName]=useState("");
  const [patientID,setPatientID]=useState("");
  const ref = collection(firestore,"doctor")

  // const createUser = async () =>{
  //   await addDoc(ref,{Name:newName,Email:newEmail,Credit:10}) 
  // };

const userCollectionRef = collection(firestore, "doctor");
const getDoctors = async () => {
  const data = await getDocs(userCollectionRef);
  setDoctors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
};

  const updateUser = async() =>{
    let doctorref = doc(firestore, "doctor", doctorName)
    updateDoc(doctorref,{PatientID: arrayUnion(patientID)}).then(()=>{
      getDoctors();
    });
  };

  const deleteUser= async(id) =>{
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
    <div>
    <input 
        placeholder="...Doctor ID"
        onChange={(e)=>{
          setDoctorName(e.target.value);
        }}
      />
      <input 
        placeholder="...Patient ID"
        onChange={(e)=>{
          setPatientID(e.target.value);
        }}
      />
      <button onClick={updateUser}>Update Patient ID</button>
      <button onClick={deleteUser}>Remove Patient ID</button>
    {/* <button onClick={()=>updateUser(doctor.id,doctor.PatientID)}>Increase Credit</button>
    <button onClick={()=>deleteUser(doctor.id)}>Delete User</button> */}

    <table className="content-table" classNamestyle={{ margin: "50px", 'text-align': 'center', 'padding':'20px' }}>
        <thead>
          <th>NAME</th>
          <th>SPECIALIZATION</th>
          <th>PATIENT ID</th>
          <th>WORKING DAYS</th>
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
      </table>
    </div>
  );
}

export default Receiptionist;
