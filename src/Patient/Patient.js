import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import AddItem from "./components/AddItem";
import ItemsList from "./components/ItemList";
import "./Patient.css";

function Patient() {
  const [itemId, setItemId] = useState("");

  const getItemIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setItemId(id);
  };

  return (
    <>
      <Container style={{ width: "500px" }}>
        <Row>
          <Col>
            <AddItem id={itemId} setItemId={setItemId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <ItemsList getItemId={getItemIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Patient;
