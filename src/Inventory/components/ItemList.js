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
    console.log(data.docs);
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

      {/* <pre>{JSON.stringify(items, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Item Title</th>
            <th>Available</th>
            <th>Max</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.available}</td>
                <td>{doc.max}</td>
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
