import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import ItemDataService from "../services/item_services";

const ItemsList = ({ getItemId }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const data = await ItemDataService.getAllItems();
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await ItemDataService.deleteItem(id);
    getItems();
  };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getItems}>
          Refresh List
        </Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Doctor Assigned</th>
            <th>Last Visited</th>
            <th>Due Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((doc, index) => {
            return (
              <tr key={index}>
                <td>{doc.id}</td>
                <td>{doc.name}</td>
                <td>{doc.age}</td>
                <td>{doc.doctorAssigned}</td>
                <td>{doc.lastVisited}</td>
                <td>{doc.dueDate}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getItemId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ItemsList;
