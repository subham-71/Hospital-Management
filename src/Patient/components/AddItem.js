import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import ItemDataService from "../services/item_services";

const AddItem = ({ id, setItemId }) => {

  const [Issues, setIssues] = useState([]);
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [doctorAssigned, setDoctorAssigned] = useState("");
  const [lastVisited, setLastVisited] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (id === "" || name === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newItem = {
      Issues,
      doctorAssigned,
      dueDate,
      lastVisited,
      age,
      name
    };
    console.log(newItem);
    try {
      if (id !== undefined && id !== "") {
        await ItemDataService.updateItem(id, newItem);
        setItemId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await ItemDataService.addItem(newItem);
        setMessage({ error: false, msg: "New Item added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setIssues([]);
    setDoctorAssigned("");
    setDueDate("");
    setAge("");
    setName("");
    setLastVisited("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await ItemDataService.getItem(id);
      console.log("Patient record is :", docSnap.data());
      setIssues(docSnap.data().Issues);
      setDoctorAssigned(docSnap.data().doctorAssigned);
      setDueDate(docSnap.data().dueDate);
      setLastVisited(docSnap.data().lastVisited);
      setName(docSnap.data().name);
      setAge(docSnap.data().age);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The Patient ID here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formItemID">
            <InputGroup>
              <InputGroup.Text id="formItemID">ID</InputGroup.Text>
              <Form.Control type="text" placeholder="Patient ID" value={id} onChange={(e)=>{}}/>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemName">
            <InputGroup>
              <InputGroup.Text id="formItemName">NA</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemAge">
            <InputGroup>
              <InputGroup.Text id="formItemAge">AG</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemDoctor">
            <InputGroup>
              <InputGroup.Text id="formItemDoctor">DA</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Doctor Assigned"
                value={doctorAssigned}
                onChange={(e) => setDoctorAssigned(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemLV">
            <InputGroup>
              <InputGroup.Text id="formItemLV">LA</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Last Visited"
                value={lastVisited}
                onChange={(e) => setLastVisited(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemDD">
            <InputGroup>
              <InputGroup.Text id="formItemDD">DD</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddItem;
