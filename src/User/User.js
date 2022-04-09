import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "../Components/Auth/FireBase";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userCollectionRef = collection(firestore, "users");
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      {users.map((user) => (
        <div>
          {" "}
          <h1>Name: {user.Hospital}</h1>
          <h1>Name: {user.Vaccines}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
2