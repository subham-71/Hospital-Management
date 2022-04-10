import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import ItemDataService from "../services/item_services";

const AddItem = ({ id, setItemId }) => {
  const [title, setTitle] = useState("");
  const [available, setAvailable] = useState("");
  const [max, setMax] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (title === "" || available === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newItem = {
      title,
      available,
      max,
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

    setTitle("");
    setAvailable("");
    setMax("");
  };

  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await ItemDataService.getItem(id);
      console.log("the record is :", docSnap.data());
      setTitle(docSnap.data().title);
      setAvailable(docSnap.data().available);
      setMax(docSnap.data().max);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
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
          <Form.Group className="mb-3" controlId="formItemTitle">
            <InputGroup>
              <InputGroup.Text id="formItemTitle"></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Item Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemAuthor">
            <InputGroup>
              <InputGroup.Text id="formItemAuthor"></InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Items available currently"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formItemMax">
            <InputGroup>
              <InputGroup.Text id="formItemMax"></InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Max item available"
                value={max}
                onChange={(e) => setMax(e.target.value)}
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
